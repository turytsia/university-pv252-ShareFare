import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Item, ItemStatus, Conversation } from '../types';
import { Button } from './Button';

import { useAppContext } from '../context/AppContext';


interface ProfileItemCardProps {
  item: Item;
  activeTab: 'posted' | 'received' | 'donated';
}

export const ProfileItemCard: React.FC<ProfileItemCardProps> = ({ item, activeTab }) => {
  const { 
    conversations, users, items, 
    messages, sendMessage, 
    currentUser, 
    markAsDonated, markAsReceived, markAsRead } = useAppContext();
  const navigate = useNavigate();

  const getConversationByItemId = (itemId: string) => {
    const conv = conversations.find((conv: Conversation) => 
      //console.log("Inside find conv.itemid: ", conv.itemId)
      conv.itemId === itemId
   );
    //console.log("Conv ID for Item ID: ", convId, "for ", itemId);
    return conv.id;
  }

  const goToConversationButton = (buttonText: string) =>  {
    return <Button 
      variant="primary" size="sm" 
      onClick={() => window.location.hash = `#/messages/${getConversationByItemId(item.id)}`}>
        { buttonText }
      </Button>
  }

  return (
    <div className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
      <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover bg-gray-100" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{item.quantity} • Posted {item.status === ItemStatus.DONATED ? 'Oct 20' : 'Today'}</p>
          </div>
          <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
            item.status === 'available' ? 'bg-green-100 text-green-700' :
            item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            item.status === 'claimed' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-600'
          }`}>{item.status}</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {item.status === ItemStatus.PENDING && activeTab === 'posted' && "Reserved by James • Awaiting Pickup"}
            {item.status === ItemStatus.PENDING && activeTab === 'received' && "Reserved by You • Pickup Tomorrow"}
            {item.status === ItemStatus.CLAIMED && "Pickup Complete • Feedback Pending"}
          </div>

          {activeTab === 'posted' && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/edit/${item.id}`)}>Edit</Button>
              {item.status === ItemStatus.PENDING && (
                goToConversationButton("View Chat")
                // <Button variant="primary" size="sm" onClick={() => window.location.hash = `#/messages/${getConversationByItemId(item.id)}`}>View Chat</Button>
              )}
            </div>
          )}
          {activeTab === 'received' && item.status === ItemStatus.CLAIMED && (
            goToConversationButton("Leave Feedback")
          )}
        </div>
      </div>
    </div>
  );
};
