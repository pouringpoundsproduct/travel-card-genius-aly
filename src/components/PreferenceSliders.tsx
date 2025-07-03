
import { Slider } from "@/components/ui/slider";
import { Plane, Hotel, Coffee } from "lucide-react";
import { UserPreferences } from "@/types/cardSelection";

interface PreferenceSlidersProps {
  preferences: UserPreferences;
  onSliderChange: (key: string, value: number[]) => void;
}

export const PreferenceSliders = ({ preferences, onSliderChange }: PreferenceSlidersProps) => {
  return (
    <div className="space-y-6">
      {/* Hotels Annual Spend */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Hotel className="h-5 w-5 text-blue-400" />
          <label className="font-medium">How much do you spend on hotels yearly?</label>
        </div>
        <div className="px-2">
          <Slider
            value={preferences.hotels_annual}
            onValueChange={(value) => onSliderChange('hotels_annual', value)}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>₹0</span>
            <span className="font-bold text-blue-400">₹{preferences.hotels_annual[0].toLocaleString()}</span>
            <span>₹5L</span>
          </div>
        </div>
      </div>

      {/* Flights Annual Spend */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Plane className="h-5 w-5 text-purple-400" />
          <label className="font-medium">Annual flight bookings budget?</label>
        </div>
        <div className="px-2">
          <Slider
            value={preferences.flights_annual}
            onValueChange={(value) => onSliderChange('flights_annual', value)}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-300 mt-1">
            <span>₹0</span>
            <span className="font-bold text-purple-400">₹{preferences.flights_annual[0].toLocaleString()}</span>
            <span>₹5L</span>
          </div>
        </div>
      </div>

      {/* Compact Lounge Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Domestic Lounge */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Coffee className="h-4 w-4 text-green-400" />
            <label className="text-sm font-medium">Domestic Lounge Visits Annually</label>
          </div>
          <Slider
            value={preferences.domestic_lounge_usage_quarterly}
            onValueChange={(value) => onSliderChange('domestic_lounge_usage_quarterly', value)}
            max={30}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="text-center">
            <span className="font-bold text-green-400 text-sm">{preferences.domestic_lounge_usage_quarterly[0]} visits</span>
          </div>
        </div>

        {/* International Lounge */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Coffee className="h-4 w-4 text-yellow-400" />
            <label className="text-sm font-medium">International Lounge Visits Annually</label>
          </div>
          <Slider
            value={preferences.international_lounge_usage_quarterly}
            onValueChange={(value) => onSliderChange('international_lounge_usage_quarterly', value)}
            max={20}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="text-center">
            <span className="font-bold text-yellow-400 text-sm">{preferences.international_lounge_usage_quarterly[0]} visits</span>
          </div>
        </div>
      </div>
    </div>
  );
};
