
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Star } from "lucide-react";

export const Hero = () => {
  const scrollToCardSelection = () => {
    const element = document.getElementById('card-selection');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      </div>

      {/* Floating Plane Animation */}
      <div className="absolute top-20 left-0 w-full">
        <div className="animate-float">
          <Plane className="h-8 w-8 text-blue-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-400/30">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-blue-200 font-medium">Trusted by 50K+ Travelers</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Unlock Your Perfect
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Travel Card
            </span>
            <span className="block text-4xl md:text-6xl">with Aly Hajiani ✈️</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore top-rated travel credit cards and exclusive offers curated just for you!
            Get personalized recommendations based on your spending habits.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              onClick={scrollToCardSelection}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Find Your Travel Card
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-blue-300">Travel Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">₹2L+</div>
              <div className="text-blue-300">Avg. Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-blue-300">Exclusive Deals</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
