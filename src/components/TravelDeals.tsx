
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Percent, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TravelDeals = () => {
  const navigate = useNavigate();

  // Mock travel deals data - in production this would come from CashKaro API
  const deals = [
    {
      brand_name: "MakeMyTrip",
      cashback: "12%",
      title: "Flight Bookings",
      description: "Score up to 12% cashback on domestic and international flights - because every rupee saved is a rupee earned for your next adventure! ✈️",
      category: "flights",
      terms_link: "#"
    },
    {
      brand_name: "Booking.com",
      cashback: "8%",
      title: "Hotel Reservations",
      description: "Get 8% cashback on hotel bookings worldwide. From budget stays to luxury resorts - we've got your back! 🏨",
      category: "hotels",
      terms_link: "#"
    },
    {
      brand_name: "Agoda",
      cashback: "10%",
      title: "Accommodation Deals",
      description: "Save 10% on your next hotel or resort booking. More savings = more travel experiences! 🌴",
      category: "hotels",
      terms_link: "#"
    },
    {
      brand_name: "Cleartrip",
      cashback: "15%",
      title: "Travel Packages",
      description: "Special cashback on complete travel packages. Let us handle the planning while you save big! 📦",
      category: "packages",
      terms_link: "#"
    },
    {
      brand_name: "Goibibo",
      cashback: "9%",
      title: "Flight + Hotel Combos",
      description: "Combo deals with extra cashback on flight + hotel bookings. Double the savings, double the fun! 🎯",
      category: "combo",
      terms_link: "#"
    },
    {
      brand_name: "Yatra",
      cashback: "7%",
      title: "Bus & Train Tickets",
      description: "Cashback on bus and train ticket bookings. Every journey counts, every saving matters! 🚆",
      category: "transport",
      terms_link: "#"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flights':
      case 'packages':
      case 'combo':
        return <Plane className="h-5 w-5" />;
      case 'hotels':
        return <Hotel className="h-5 w-5" />;
      default:
        return <Percent className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'flights':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'hotels':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'packages':
        return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'combo':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'transport':
        return 'bg-red-500/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const handleViewAllOffers = () => {
    navigate('/cards');
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Exclusive Travel Deals That'll Make You Dance! 💃🕺
          </h2>
          <p className="text-xl text-gray-300">
            Because who doesn't love saving money while planning their dream vacation? 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group overflow-hidden"
            >
              <CardHeader className="relative">
                {/* Cashback Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg px-3 py-1">
                    {deal.cashback} Cashback 🎁
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(deal.category)}`}>
                    {getCategoryIcon(deal.category)}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors">
                      {deal.brand_name}
                    </CardTitle>
                    <p className="text-blue-300 font-medium">{deal.title}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {deal.description}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm"
                    onClick={() => window.open(deal.terms_link, '_blank')}
                  >
                    Terms & Conditions
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
                  onClick={() => {
                    // This would redirect to CashKaro affiliate link
                    window.open('#', '_blank');
                  }}
                >
                  Grab This Deal! 🔥
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Offers CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleViewAllOffers}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg"
          >
            View All Offers 🌟 (50+ Deals Waiting!)
          </Button>
        </div>
      </div>
    </section>
  );
};
