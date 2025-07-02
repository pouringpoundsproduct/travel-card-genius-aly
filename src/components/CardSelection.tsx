
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plane, Hotel, Coffee, Train } from "lucide-react";
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
    international_lounge_usage_quarterly: [5],
    railway_lounge_usage_quarterly: [2]
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (key: string, value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      // Build the payload for the Card Genius API
      const recommendationPayload = {
        amazon_spends: 1280,
        flipkart_spends: 10000,
        grocery_spends_online: 7500,
        online_food_ordering: 5000,
        other_online_spends: 3000,
        other_offline_spends: 5000,
        dining_or_going_out: 5000,
        fuel: 5000,
        school_fees: 20000,
        rent: 35000,
        mobile_phone_bills: 1500,
        electricity_bills: 7500,
        water_bills: 2500,
        ott_channels: 1000,
        new_monthly_cat_1: 0,
        new_monthly_cat_2: 0,
        new_monthly_cat_3: 0,
        hotels_annual: preferences.hotels_annual[0],
        flights_annual: preferences.flights_annual[0],
        insurance_health_annual: 75000,
        insurance_car_or_bike_annual: 45000,
        large_electronics_purchase_like_mobile_tv_etc: 100000,
        all_pharmacy: 99,
        new_cat_1: 0,
        new_cat_2: 0,
        new_cat_3: 0,
        domestic_lounge_usage_quarterly: preferences.domestic_lounge_usage_quarterly[0],
        international_lounge_usage_quarterly: preferences.international_lounge_usage_quarterly[0],
        railway_lounge_usage_quarterly: preferences.railway_lounge_usage_quarterly[0],
        movie_usage: 3,
        movie_mov: 600,
        dining_usage: 3,
        dining_mov: 1500,
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
      const topCards = personalizedData.savings?.slice(0, 6) || [];

      onRecommendations(preferences, topCards);
      
      toast({
        title: "Boom! 💥",
        description: "Found your perfect travel cards! Get ready to save big!",
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
                  <label className="text-sm font-medium">Domestic Lounge Visits/Quarter</label>
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
                  <label className="text-sm font-medium">International Lounge Visits/Quarter</label>
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

            {/* Railway Lounge - Compact */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Train className="h-4 w-4 text-red-400" />
                <label className="text-sm font-medium">Railway Lounge Usage (Quarterly)</label>
              </div>
              <div className="flex items-center space-x-4">
                <Slider
                  value={preferences.railway_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('railway_lounge_usage_quarterly', value)}
                  max={15}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="font-bold text-red-400 text-sm min-w-[60px]">{preferences.railway_lounge_usage_quarterly[0]} visits</span>
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
