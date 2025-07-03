
import { UserPreferences, Card } from "@/types/cardSelection";

export const filterCardsByLoungeRequirements = (cards: Card[], userPreferences: UserPreferences): Card[] => {
  const requiredDomesticLounges = userPreferences.domestic_lounge_usage_quarterly[0];
  const requiredInternationalLounges = userPreferences.international_lounge_usage_quarterly[0];

  console.log('User requirements:', {
    domestic: requiredDomesticLounges,
    international: requiredInternationalLounges
  });

  return cards.filter(card => {
    // Check if card has travel benefits
    if (!card.travel_benefits) {
      console.log(`Card ${card.card_name} excluded: No travel benefits`);
      return false;
    }

    // Extract lounge access from travel benefits
    const domesticLoungesOffered = card.travel_benefits.domestic_lounges_unlocked || 0;
    const internationalLoungesOffered = card.travel_benefits.international_lounges_unlocked || 0;

    console.log(`Card ${card.card_name}:`, {
      offered_domestic: domesticLoungesOffered,
      offered_international: internationalLoungesOffered,
      required_domestic: requiredDomesticLounges,
      required_international: requiredInternationalLounges
    });

    // Filter cards that meet or exceed the customer's lounge requirements
    const meetsDomesticRequirement = domesticLoungesOffered >= requiredDomesticLounges;
    const meetsInternationalRequirement = internationalLoungesOffered >= requiredInternationalLounges;

    const passesFilter = meetsDomesticRequirement && meetsInternationalRequirement;
    
    if (!passesFilter) {
      console.log(`Card ${card.card_name} excluded:`, {
        domestic_check: meetsDomesticRequirement,
        international_check: meetsInternationalRequirement
      });
    }

    return passesFilter;
  });
};
