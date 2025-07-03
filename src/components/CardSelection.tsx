
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plane, Hotel, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardSelectionProps {
  onRecommendations: (preferences: any, cards: any[]) => void;
}

export const CardSelection = ({ onRecommendations }: CardSelectionProps) => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    hotels_annual: [50000],
    flights_annual: [75000],
    domestic_lounge_usage_quarterly: [10],
    international_lounge_usage_quarterly: [5]
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (key: string, value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filterCardsByLoungeRequirements = (cards: any[], userPreferences: any) => {
    const requiredDomesticLounges = userPreferences.domestic_lounge_usage_quarterly[0];
    const requiredInternationalLounges = userPreferences.international_lounge_usage_quarterly[0];

    return cards.filter(card => {
      // Check if card has travel benefits
      if (!card.travel_benefits) {
        return false; // Exclude cards without travel benefits
      }

      // Extract lounge access from travel benefits
      const domesticLoungesOffered = card.travel_benefits.domestic_lounges_unlocked || 0;
      const internationalLoungesOffered = card.travel_benefits.international_lounges_unlocked || 0;

      // Filter cards that meet or exceed the customer's lounge requirements
      const meetsDomesticRequirement = domesticLoungesOffered >= requiredDomesticLounges;
      const meetsInternationalRequirement = internationalLoungesOffered >= requiredInternationalLounges;

      return meetsDomesticRequirement && meetsInternationalRequirement;
    });
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      // Build the simplified payload for the Card Genius API
      const recommendationPayload = {
        hotels_annual: preferences.hotels_annual[0],
        flights_annual: preferences.flights_annual[0],
        domestic_lounge_usage_quarterly: preferences.domestic_lounge_usage_quarterly[0],
        international_lounge_usage_quarterly: preferences.international_lounge_usage_quarterly[0],
        selected_card_id: null
      };

      const personalizedResponse = await fetch('https://card-recommendation-api-v2.bankkaro.com/cg/api/pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommendationPayload)
      });

      if (!personalizedResponse.ok) {
        throw new Error('Failed to fetch personalized recommendations');
      }

      const personalizedData = await personalizedResponse.json();
      console.log('API Response:', personalizedData); // Debug log to see the response structure
      
      let topCards = personalizedData.savings?.slice(0, 12) || []; // Get more cards initially for filtering

      // Apply frontend filtering based on lounge requirements
      const filteredCards = filterCardsByLoungeRequirements(topCards, preferences);
      
      console.log('Cards after lounge filtering:', filteredCards); // Debug log
      
      // Take top 6 cards after filtering
      const finalCards = filteredCards.slice(0, 6);

      if (finalCards.length === 0) {
        toast({
          title: "No Matching Cards Found! 😔",
          description: "Try adjusting your lounge requirements to see more options.",
          variant: "destructive",
        });
        return;
      }

      onRecommendations(preferences, finalCards);
      
      toast({
        title: "Boom! 💥",
        description: `Found ${finalCards.length} perfect travel cards that match your lounge needs!`,
      });

    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Oops! 😅",
        description: "Something went wrong. Don't worry, let's try again!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="card-selection" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Quick Travel Style Check! ✈️
          </h2>
          <p className="text-lg text-gray-300">
            Just slide to tell us about your travel habits (takes 30 seconds!) 
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center text-white">
              Customize Your Travel Profile 🎯
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hotels Annual Spend */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Hotel className="h-5 w-5 text-blue-400" />
                <label className="font-medium">How much do you spend on hotels yearly?</label>
              </div>
              <div className="px-2">
                <Slider
                  value={preferences.hotels_annual}
                  onValueChange={(value) => handleSliderChange('hotels_annual', value)}
                  max={500000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-1">
                  <span>₹0</span>
                  <span className="font-bold text-blue-400">₹{preferences.hotels_annual[0].toLocaleString()}</span>
                  <span>₹5L</span>
                </div>
              </div>
            </div>

            {/* Flights Annual Spend */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Plane className="h-5 w-5 text-purple-400" />
                <label className="font-medium">Annual flight bookings budget?</label>
              </div>
              <div className="px-2">
                <Slider
                  value={preferences.flights_annual}
                  onValueChange={(value) => handleSliderChange('flights_annual', value)}
                  max={500000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-1">
                  <span>₹0</span>
                  <span className="font-bold text-purple-400">₹{preferences.flights_annual[0].toLocaleString()}</span>
                  <span>₹5L</span>
                </div>
              </div>
            </div>

            {/* Compact Lounge Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Domestic Lounge */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Coffee className="h-4 w-4 text-green-400" />
                  <label className="text-sm font-medium">Domestic Lounge Visits Annually</label>
                </div>
                <Slider
                  value={preferences.domestic_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('domestic_lounge_usage_quarterly', value)}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="font-bold text-green-400 text-sm">{preferences.domestic_lounge_usage_quarterly[0]} visits</span>
                </div>
              </div>

              {/* International Lounge */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Coffee className="h-4 w-4 text-yellow-400" />
                  <label className="text-sm font-medium">International Lounge Visits Annually</label>
                </div>
                <Slider
                  value={preferences.international_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('international_lounge_usage_quarterly', value)}
                  max={20}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="font-bold text-yellow-400 text-sm">{preferences.international_lounge_usage_quarterly[0]} visits</span>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <Button 
                onClick={handleGetRecommendations}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
              >
                {isLoading ? 'Finding Your Perfect Cards... 🔍' : 'Get My Dream Cards! 🚀'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
