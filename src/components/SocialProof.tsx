
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink, Heart, MessageCircle, Share } from "lucide-react";

export const SocialProof = () => {
  // Aly Hajiani's Instagram reels
  const instagramPosts = [
    {
      id: 1,
      reelUrl: "https://www.instagram.com/reel/DLl1kSVi-PV/",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      caption: "Credit card strategies that actually work! 💳 Watch how I maximize rewards on every purchase. #CreditCardHacks #TravelRewards",
      likes: 5240,
      comments: 234,
      timestamp: "1 day ago"
    },
    {
      id: 2,
      reelUrl: "https://www.instagram.com/reel/DLbxMtiONo2/",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      caption: "Airport lounge access with the right travel cards! ✈️ See which cards give you premium access worldwide. #AirportLounge #TravelPerks",
      likes: 7891,
      comments: 456,
      timestamp: "3 days ago"
    },
    {
      id: 3,
      reelUrl: "https://www.instagram.com/reel/DLY9F7TCZEk/",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      caption: "Forex fees are killing your travel budget! 💸 Learn which cards offer zero forex charges and save thousands. #ZeroForex #TravelSmart",
      likes: 3672,
      comments: 189,
      timestamp: "5 days ago"
    }
  ];

  const publicationLogos = [
    { name: "Economic Times", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "Business Standard", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "Mint", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "MoneyControl", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "Forbes India", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "Bloomberg Quint", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "Financial Express", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" },
    { name: "The Hindu", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=80&fit=crop" }
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
                  src={post.thumbnail} 
                  alt={`Instagram reel ${post.id}`}
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

                {/* View Reel Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-pink-400/30 text-pink-300 hover:bg-pink-400/10 hover:text-pink-200"
                  onClick={() => window.open(post.reelUrl, '_blank')}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Watch Reel
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Media Coverage Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Trusted by Leading Publications
          </h3>
          <p className="text-gray-300 mb-8">
            Aly's expertise has been featured across India's top financial publications
          </p>
          
          {/* Publications Horizontal Scroll */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-8 py-4">
              {[...publicationLogos, ...publicationLogos].map((publication, index) => (
                <div 
                  key={`${publication.name}-${index}`}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 h-20 w-40 flex items-center justify-center"
                >
                  <span className="text-white font-semibold text-sm text-center">
                    {publication.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
