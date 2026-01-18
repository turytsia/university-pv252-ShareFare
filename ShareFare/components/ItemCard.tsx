import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, CheckCircle } from 'lucide-react';
import { Item, User, ItemStatus } from '../types';
import { Button } from './Button';
import { isExpired } from '../utils';

interface ItemCardProps {
  item: Item;
  owner: User;
  isOwner: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, owner, isOwner }) => {
  const navigate = useNavigate();
  const expired = isExpired(item.expiryDate);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col ${expired ? 'ring-2 ring-red-200' : ''}`}>
      <div className="relative h-48">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        {expired && <div className="absolute inset-0 bg-red-500/20"></div>}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 text-gray-900">
          <MapPin className="w-3 h-3" /> {item.distance} mi
        </div>
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {item.status === ItemStatus.AVAILABLE && (
            <div className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium uppercase">
              Available
            </div>
          )}
          {item.status === ItemStatus.PENDING && (
            <div className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-medium uppercase">
              Pending
            </div>
          )}
          {expired && (
            <div className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium uppercase">
              Expired
            </div>
          )}
        </div>
        
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">{item.description}</p>
        
        <div className="flex gap-2 mb-3">
          {item.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
           <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.pickupTime}</span>
           <span className={`flex items-center gap-1 ${expired ? 'text-red-600' : ''}`}>Best by: {item.expiryDate}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-xs font-medium text-gray-900 flex items-center gap-1">
                {owner.name} {owner.verified && <span title="This user identity is verified"><CheckCircle className="w-3 h-3 text-blue-500" /></span>}
              </p>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {item.completionRate}% completion
              </p>
            </div>
          </div>
          {isOwner ? (
             <Button variant="outline" size="sm" onClick={() => navigate(`/item/${item.id}`)}>View</Button>
          ) : (
             <Button size="sm" onClick={() => navigate(`/item/${item.id}`)}>View Item</Button>
          )}
        </div>
      </div>
    </div>
  );
};
