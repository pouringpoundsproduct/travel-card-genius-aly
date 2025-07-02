
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, Heart, MessageCircle, Share } from "lucide-react";

export const SocialProof = () => {
  // Aly Hajiani's Instagram posts
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      caption: "Just landed in Dubai with my premium travel card! Free lounge access made the layover so comfortable ✈️ #TravelHacks #CreditCards",
      likes: 2840,
      comments: 156,
      timestamp: "2 days ago"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      caption: "Maldives here I come! 🏝️ Saved ₹25,000 on this trip using the right travel card rewards. DM for card recommendations! #ThatCreditCardGuy",
      likes: 4521,
      comments: 289,
      timestamp: "5 days ago"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      caption: "Pro tip: Always use travel cards for international purchases! Zero forex fees = more money for experiences 💰 #SmartTravel #CreditCardExpert",
      likes: 1923,
      comments: 98,
      timestamp: "1 week ago"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="h-8 w-8 text-pink-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Follow Aly's Journey
            </h2>
          </div>
          <p className="text-xl text-gray-300">
            Real travel experiences and credit card tips from Aly Hajiani
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instagramPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Instagram Post Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Instagram Overlay on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-6 w-6" />
                      <span className="font-semibold">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-6 w-6" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Instagram Logo */}
                <div className="absolute top-4 right-4">
                  <Instagram className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>

              <CardContent className="p-6">
                {/* Caption */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.caption}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span>{post.timestamp}</span>
                </div>

                {/* View on Instagram Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-pink-400/30 text-pink-300 hover:bg-pink-400/10 hover:text-pink-200"
                  onClick={() => window.open('https://www.instagram.com/thatcreditcardguy/', '_blank')}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  View on Instagram
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <Button 
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://www.instagram.com/thatcreditcardguy/', '_blank')}
          >
            <Instagram className="h-5 w-5 mr-2" />
            Follow @thatcreditcardguy
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          
          <p className="text-gray-400 mt-4">
            Join 100K+ followers for daily travel tips and card recommendations
          </p>
        </div>
      </div>
    </section>
  );
};
