
import { UserPreferences, Card } from "@/types/cardSelection";

export const filterCardsByLoungeRequirements = (cards: Card[], userPreferences: UserPreferences): Card[] => {
  const requiredDomesticLounges = userPreferences.domestic_lounge_usage_quarterly[0];
  const requiredInternationalLounges = userPreferences.international_lounge_usage_quarterly[0];

  console.log('User lounge requirements:', {
    domestic: requiredDomesticLounges,
    international: requiredInternationalLounges
  });

  console.log('Total cards received from API:', cards.length);

  // Filter cards that meet both domestic and international lounge requirements
  const filteredCards = cards.filter((card, index) => {
    // Check if card has travel benefits
    if (!card.travel_benefits) {
      console.log(`Card ${index} (${card.card_name}) excluded: No travel benefits`);
      return false;
    }

    // Extract lounge access from travel benefits
    const domesticLoungesOffered = card.travel_benefits.domestic_lounges_unlocked || 0;
    const internationalLoungesOffered = card.travel_benefits.international_lounges_unlocked || 0;

    console.log(`Card ${index} (${card.card_name}):`, {
      offered_domestic: domesticLoungesOffered,
      offered_international: internationalLoungesOffered,
      required_domestic: requiredDomesticLounges,
      required_international: requiredInternationalLounges
    });

    // Both conditions must be met: domestic AND international lounge requirements
    const meetsDomesticRequirement = domesticLoungesOffered >= requiredDomesticLounges;
    const meetsInternationalRequirement = internationalLoungesOffered >= requiredInternationalLounges;

    const passesFilter = meetsDomesticRequirement && meetsInternationalRequirement;
    
    if (passesFilter) {
      console.log(`✅ Card ${index} (${card.card_name}) PASSES filter`);
    } else {
      console.log(`❌ Card ${index} (${card.card_name}) FAILS filter:`, {
        domestic_check: meetsDomesticRequirement ? '✅' : '❌',
        international_check: meetsInternationalRequirement ? '✅' : '❌'
      });
    }

    return passesFilter;
  });

  console.log(`Cards after lounge filtering: ${filteredCards.length} out of ${cards.length} total cards`);
  
  // Return filtered cards maintaining their API priority order
  return filteredCards;
};
