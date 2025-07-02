import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, CreditCard, IndianRupee, ExternalLink, Gift, Plane, Hotel, Coffee } from "lucide-react";

interface TravelCard {
  id: number;
  name: string;
  nick_name: string;
  rating: number;
  image: string;
  joining_fee_text: string;
  annual_saving: string;
  commission: string;
  commission_type: string;
  card_type: string;
  product_usps: Array<{
    header: string;
    description: string;
  }>;
  welcome_benefits: Array<{
    header: string;
    description: string;
  }>;
  travel_benefits: Array<{
    header: string;
    description: string;
  }>;
  reward_benefits: Array<{
    header: string;
    description: string;
  }>;
}

const CardDetail = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState<TravelCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCardDetails();
  }, [cardId]);

  const fetchCardDetails = async () => {
    try {
      const response = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
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

      if (!response.ok) throw new Error('Failed to fetch card details');
      
      const data = await response.json();
      const foundCard = data.data?.cards?.find((c: any) => c.id.toString() === cardId);
      setCard(foundCard || null);
    } catch (error) {
      console.error('Error fetching card details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCommission = (commission: string, commissionType: string) => {
    if (!commission || commission === "0") return null;
    
    if (commissionType === "percentage") {
      return `${commission}% Cashback`;
    } else {
      return `₹${commission}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg h-96 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Card Not Found</h1>
          <Button onClick={() => navigate('/cards')} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cards
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/cards')}
          variant="outline"
          className="mb-6 border-white/30 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cards
        </Button>

        {/* Card Header */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
          <CardHeader className="pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card Image */}
              <div className="lg:col-span-1">
                <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  {card.image ? (
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <CreditCard className="h-16 w-16 text-white/50" />
                  )}
                </div>
              </div>

              {/* Card Info */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <CardTitle className="text-3xl text-white mb-2">{card.name}</CardTitle>
                  {card.card_type && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      {card.card_type}
                    </Badge>
                  )}
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Joining Fee */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-gray-300 text-sm mb-1">Joining Fee</h4>
                    <p className="text-white font-bold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {card.joining_fee_text || 'N/A'}
                    </p>
                  </div>

                  {/* Rating */}
                  {card.rating && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-gray-300 text-sm mb-1">Customer Rating</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-bold text-lg">{card.rating}/5</span>
                      </div>
                    </div>
                  )}

                  {/* Commission Reward */}
                  {formatCommission(card.commission, card.commission_type) && (
                    <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                      <h4 className="text-green-300 text-sm mb-1">Your Reward</h4>
                      <p className="text-green-300 font-bold flex items-center">
                        <Gift className="h-4 w-4 mr-1" />
                        Earn {formatCommission(card.commission, card.commission_type)}!
                      </p>
                    </div>
                  )}

                  {/* Annual Savings */}
                  {card.annual_saving && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-gray-300 text-sm mb-1">Potential Annual Savings</h4>
                      <p className="text-green-400 font-bold flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {card.annual_saving}
                      </p>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <Button 
                  className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 text-lg"
                  onClick={() => window.open('#', '_blank')}
                >
                  Apply Now & Earn Your Reward! 🚀
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Benefits Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product USPs */}
          {card.product_usps && card.product_usps.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  Top Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.product_usps.map((usp, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-blue-300 font-medium mb-1">{usp.header}</h4>
                    <p className="text-gray-300 text-sm">{usp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Welcome Benefits */}
          {card.welcome_benefits && card.welcome_benefits.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-green-400" />
                  Welcome Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.welcome_benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-green-300 font-medium mb-1">{benefit.header}</h4>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Travel Benefits */}
          {card.travel_benefits && card.travel_benefits.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Plane className="h-5 w-5 mr-2 text-blue-400" />
                  Travel Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.travel_benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-blue-300 font-medium mb-1">{benefit.header}</h4>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Reward Benefits */}
          {card.reward_benefits && card.reward_benefits.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <IndianRupee className="h-5 w-5 mr-2 text-purple-400" />
                  Reward Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.reward_benefits.map((benefit, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-purple-300 font-medium mb-1">{benefit.header}</h4>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Travel Experience?</h3>
          <p className="text-gray-300 mb-6">
            Join thousands of smart travelers who are already saving big with this card!
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg"
            onClick={() => window.open('#', '_blank')}
          >
            Apply Now & Start Saving! 💫
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;