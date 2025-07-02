
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Plane, Hotel, Coffee, Train } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      // First get travel cards
      const travelCardsResponse = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: "best-travel-credit-card",
          banks_ids: [],
          card_networks: [],
          annualFees: "",
          credit_score: "",
          sort_by: "",
          free_cards: "",
          eligiblityPayload: {},
          cardGeniusPayload: {}
        })
      });

      if (!travelCardsResponse.ok) {
        throw new Error('Failed to fetch travel cards');
      }

      const travelCardsData = await travelCardsResponse.json();
      
      // Get personalized recommendations
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

      // Combine and process the data
      const combinedCards = [...(travelCardsData.data || []), ...(personalizedData.data || [])];
      const topCards = combinedCards.slice(0, 5);

      onRecommendations(preferences, topCards);
      
      toast({
        title: "Success!",
        description: "Found your perfect travel cards based on your preferences!",
      });

    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="card-selection" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tell Us About Your Travel Style
          </h2>
          <p className="text-xl text-gray-300">
            Help us find the perfect travel cards tailored to your spending habits
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Customize Your Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Hotels Annual Spend */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Hotel className="h-5 w-5 text-blue-400" />
                <label className="text-lg font-medium">Annual Hotel Spending</label>
              </div>
              <div className="px-4">
                <Slider
                  value={preferences.hotels_annual}
                  onValueChange={(value) => handleSliderChange('hotels_annual', value)}
                  max={200000}
                  min={10000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>₹10,000</span>
                  <span className="font-bold text-blue-400">₹{preferences.hotels_annual[0].toLocaleString()}</span>
                  <span>₹2,00,000</span>
                </div>
              </div>
            </div>

            {/* Flights Annual Spend */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Plane className="h-5 w-5 text-purple-400" />
                <label className="text-lg font-medium">Annual Flight Spending</label>
              </div>
              <div className="px-4">
                <Slider
                  value={preferences.flights_annual}
                  onValueChange={(value) => handleSliderChange('flights_annual', value)}
                  max={300000}
                  min={15000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>₹15,000</span>
                  <span className="font-bold text-purple-400">₹{preferences.flights_annual[0].toLocaleString()}</span>
                  <span>₹3,00,000</span>
                </div>
              </div>
            </div>

            {/* Domestic Lounge Access */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Coffee className="h-5 w-5 text-green-400" />
                <label className="text-lg font-medium">Domestic Lounge Visits (Quarterly)</label>
              </div>
              <div className="px-4">
                <Slider
                  value={preferences.domestic_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('domestic_lounge_usage_quarterly', value)}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>0</span>
                  <span className="font-bold text-green-400">{preferences.domestic_lounge_usage_quarterly[0]} visits</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            {/* International Lounge Access */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Coffee className="h-5 w-5 text-yellow-400" />
                <label className="text-lg font-medium">International Lounge Visits (Quarterly)</label>
              </div>
              <div className="px-4">
                <Slider
                  value={preferences.international_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('international_lounge_usage_quarterly', value)}
                  max={30}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>0</span>
                  <span className="font-bold text-yellow-400">{preferences.international_lounge_usage_quarterly[0]} visits</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* Railway Lounge Access */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Train className="h-5 w-5 text-red-400" />
                <label className="text-lg font-medium">Railway Lounge Visits (Quarterly)</label>
              </div>
              <div className="px-4">
                <Slider
                  value={preferences.railway_lounge_usage_quarterly}
                  onValueChange={(value) => handleSliderChange('railway_lounge_usage_quarterly', value)}
                  max={20}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-300 mt-2">
                  <span>0</span>
                  <span className="font-bold text-red-400">{preferences.railway_lounge_usage_quarterly[0]} visits</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            <div className="pt-6 text-center">
              <Button 
                onClick={handleGetRecommendations}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
              >
                {isLoading ? 'Finding Your Cards...' : 'Get My Best Card'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
