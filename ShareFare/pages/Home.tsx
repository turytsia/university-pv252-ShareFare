import React, { useState, useMemo } from 'react';
import { MapPin, Search, Filter, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ItemCard } from '../components/ItemCard';
import { FilterPanel } from '../components/FilterPanel';
import { ItemStatus } from '../types';
import { isExpired } from '../utils';

export const Home = () => {
  const { items, users, currentUser } = useAppContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [maxDistance, setMaxDistance] = useState(5);
  const [dietary, setDietary] = useState<string[]>([]);
  const [pickupTime, setPickupTime] = useState('any');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [showMyItems, setShowMyItems] = useState(true);
  const [showExpired, setShowExpired] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const isAvailable = item.status === ItemStatus.AVAILABLE;
      const isMyPending = item.status === ItemStatus.PENDING && item.ownerId === currentUser?.id;

      if (!isAvailable && !isMyPending) return false;

      if (!showMyItems && item.ownerId === currentUser?.id) return false;

      if (!showExpired && isExpired(item.expiryDate)) return false;

      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      if (item.distance > maxDistance) return false;

      if (onlyVerified) {
        const owner = users[item.ownerId];
        if (!owner?.verified) return false;
      }

      if (dietary.length > 0) {
        const hasAllTags = dietary.every(tag => item.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    }).sort((a, b) => a.distance - b.distance);
  }, [items, searchTerm, categoryFilter, maxDistance, dietary, currentUser, onlyVerified, users, showMyItems, showExpired]);

  const categories = ['All', 'Produce', 'Dairy', 'Prepared Food', 'Pantry', 'Baked Goods', 'Other'];

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-600" />
          <span>{currentUser?.location}</span>
          <button className="text-primary-600 font-medium hover:underline">Change</button>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary-600" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for items..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg border ${showFilters ? 'bg-primary-50 border-primary-500 text-primary-600' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showMyItems"
              checked={showMyItems}
              onChange={(e) => setShowMyItems(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="showMyItems" className="text-sm text-gray-700">Include my items</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showExpired"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="showExpired" className="text-sm text-gray-700">Show expired</label>
          </div>
        </div>
      </div>

      {showFilters && (
        <FilterPanel 
          maxDistance={maxDistance} setMaxDistance={setMaxDistance}
          pickupTime={pickupTime} setPickupTime={setPickupTime}
          dietary={dietary} setDietary={setDietary}
          onlyVerified={onlyVerified} setOnlyVerified={setOnlyVerified}
          onClose={() => setShowFilters(false)}
        />
      )}

      <p className="text-sm text-gray-500 mb-4">{filteredItems.length} items available near you</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard 
            key={item.id} 
            item={item} 
            owner={users[item.ownerId]} 
            isOwner={item.ownerId === currentUser?.id}
          />
        ))}
      </div>
    </div>
  );
};
