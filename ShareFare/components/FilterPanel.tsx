import React from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from './Button';
import { DietaryType } from '../types';

interface FilterPanelProps {
  maxDistance: number;
  setMaxDistance: (val: number) => void;
  pickupTime: string;
  setPickupTime: (val: string) => void;
  dietary: string[];
  setDietary: (val: string[]) => void;
  onlyVerified: boolean;
  setOnlyVerified: (val: boolean) => void;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  maxDistance, setMaxDistance,
  pickupTime, setPickupTime,
  dietary, setDietary,
  onlyVerified, setOnlyVerified,
  onClose
}) => {
  const toggleDietary = (tag: string) => {
    setDietary(dietary.includes(tag) ? dietary.filter(t => t !== tag) : [...dietary, tag]);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 animate-in slide-in-from-top-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Advanced Filters</h3>
        <button onClick={onClose}><X className="w-4 h-4 text-gray-400" /></button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Maximum Distance</label>
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">{maxDistance} mi</span>
          </div>
          <input 
            type="range" min="1" max="20" 
            value={maxDistance} 
            onChange={(e) => setMaxDistance(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Pickup Time</label>
          <div className="space-y-2">
            {['Any time', 'Today', 'Tomorrow'].map(t => (
              <label key={t} className="flex items-center gap-2">
                <input type="radio" name="pickup" checked={pickupTime === t.toLowerCase().split(' ')[0]} onChange={() => setPickupTime(t.toLowerCase().split(' ')[0])} className="text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-gray-600">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Preferences</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(DietaryType).map(tag => (
              <label key={tag} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  checked={dietary.includes(tag)}
                  onChange={() => toggleDietary(tag)}
                  className="rounded text-primary-600 focus:ring-primary-500" 
                />
                <span className="text-sm text-gray-600">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
           <div className="flex items-center gap-2 mb-2 text-primary-600 bg-primary-50 w-fit px-3 py-1 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">User Trust & Reliability</span>
           </div>
           <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                 <input 
                    type="checkbox" 
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded text-primary-600 focus:ring-primary-500 w-5 h-5" 
                 />
                 <span className="text-sm font-medium text-gray-700">Verified users only</span>
              </label>
           </div>
        </div>
        
        <Button fullWidth onClick={onClose}>Apply Filters</Button>
      </div>
    </div>
  );
};
