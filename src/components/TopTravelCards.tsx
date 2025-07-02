
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CreditCard, IndianRupee, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TravelCard {
  id: number;
  name: string;
  nick_name: string;
  rating: number;
  image: string;
  joining_fee_text: string;
  annual_saving: string;
  bk_commission: string;
  card_type: string;
  product_usps: Array<{
    header: string;
    description: string;
  }>;
}

export const TopTravelCards = () => {
  const [cards, setCards] = useState<TravelCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopCards();
  }, []);

  const fetchTopCards = async () => {
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

      if (!response.ok) throw new Error('Failed to fetch cards');
      
      const data = await response.json();
      setCards(data.data?.cards?.slice(0, 4) || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllCards = () => {
    navigate('/cards');
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loading Amazing Cards... ✨
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg border-white/20 rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Here are the Top Travel Cards Just for You! 🏆
          </h2>
          <p className="text-xl text-gray-300">
            Handpicked by Aly - these babies will transform your travel game! 🚀
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <Card 
              key={card.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <CardHeader className="text-center p-4">
                {/* Card Image */}
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
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
                    <CreditCard className="h-12 w-12 text-white/50" />
                  )}
                </div>

                <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                  {card.name}
                </CardTitle>
                
                {card.card_type && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                    {card.card_type}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="space-y-3 p-4">
                {/* Rating */}
                {card.rating && (
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">
                      {card.rating}/5
                    </span>
                  </div>
                )}

                {/* Annual Fee */}
                <div className="text-center">
                  <span className="text-gray-300 text-sm">Annual Fee: </span>
                  <span className="text-white font-bold flex items-center justify-center">
                    <IndianRupee className="h-3 w-3" />
                    {card.joining_fee_text || 'N/A'}
                  </span>
                </div>

                {/* Commission Reward */}
                {card.bk_commission && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-2 text-center">
                    <span className="text-green-300 text-sm font-medium">
                      Earn ₹{card.bk_commission} Reward! 🎉
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 text-sm"
                    onClick={() => window.open('#', '_blank')}
                  >
                    Apply Now 🚀
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 py-2 text-sm"
                    onClick={() => console.log('View details for card:', card.id)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Cards CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleViewAllCards}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
          >
            View All Cards 🌟 (50+ Options!)
          </Button>
        </div>
      </div>
    </section>
  );
};
