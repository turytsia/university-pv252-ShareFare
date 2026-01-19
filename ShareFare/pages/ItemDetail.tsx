import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { ItemStatus, Conversation } from '../types';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, users, conversations, claimItem, contactOwner, currentUser } = useAppContext();
  
  const item = items.find(i => i.id === id);
  if (!item) return <div>Item not found</div>;
  const owner = users[item.ownerId];

  const handleClaim = () => {
    const convId = claimItem(item.id);
    navigate(`/messages/${convId}`)
  };

  const handleContactOwner = () => {
    const convId = contactOwner(item.id);
    navigate(`/messages/${convId}`)
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium uppercase shadow-sm">
          {item.status}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
        <p className="text-gray-500 mb-6">{item.quantity} • {item.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map(tag => (
             <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200">{tag}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-3">
             <div className="bg-gray-100 p-2 rounded-lg"><Clock className="w-5 h-5 text-gray-600"/></div>
             <div>
               <p className="text-sm font-medium text-gray-900">Pickup Window</p>
               <p className="text-sm text-gray-500">{item.pickupTime}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <div className="bg-gray-100 p-2 rounded-lg"><MapPin className="w-5 h-5 text-gray-600"/></div>
             <div>
               <p className="text-sm font-medium text-gray-900">Location</p>
               <p className="text-sm text-gray-500">{item.distance} mi away</p>
               <p className="text-xs text-gray-400">Exact address shared after claiming</p>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={owner.avatar} className="w-12 h-12 rounded-full" alt={owner.name} />
              <div>
                <p className="font-medium text-gray-900 flex items-center gap-1">
                  {owner.name} {owner.verified && <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">Verified</span>}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500" /> {item.completionRate || 95}% completion
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs">Responds ~20 min</span>
                </p>
              </div>
            </div>
            {item.ownerId !== currentUser?.id && (
              <Button variant="outline" onClick={handleContactOwner}>
                Contact
              </Button>
            )}
          </div>
          
          {item.ownerId === currentUser?.id ? (
            <Button fullWidth disabled>You own this item</Button>
          ) : item.status === ItemStatus.AVAILABLE ? (
            <Button fullWidth size="lg" onClick={handleClaim}>Claim Item</Button>
          ) : (
             <Button fullWidth disabled variant="secondary">Not Available</Button>
          )}
        </div>
      </div>
    </div>
  );
};
