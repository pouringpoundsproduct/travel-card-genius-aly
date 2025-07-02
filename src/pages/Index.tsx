
import { Hero } from "@/components/Hero";
import { CardSelection } from "@/components/CardSelection";
import { RecommendedCards } from "@/components/RecommendedCards";
import { TravelDeals } from "@/components/TravelDeals";
import { Testimonials } from "@/components/Testimonials";
import { SocialProof } from "@/components/SocialProof";
import { AIWidget } from "@/components/AIWidget";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [userPreferences, setUserPreferences] = useState(null);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleCardRecommendations = (preferences: any, cards: any[]) => {
    setUserPreferences(preferences);
    setRecommendedCards(cards);
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <CardSelection onRecommendations={handleCardRecommendations} />
      {showRecommendations && <RecommendedCards cards={recommendedCards} />}
      <TravelDeals />
      <Testimonials />
      <SocialProof />
      <AIWidget />
      <Footer />
    </div>
  );
};

export default Index;
