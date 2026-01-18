import React from 'react';
import { Conversation, Item, User } from '../types';

interface ConversationItemProps {
  conversation: Conversation;
  item: Item;
  otherUser: User;
  currentUserId: string;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation: conv,
  item,
  otherUser: other,
  currentUserId,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? 'bg-primary-50 border-primary-100' : ''}`}
    >
      <div className="flex gap-3">
        <img src={other.avatar} alt={other.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-0.5">
            <h3 className={`font-semibold text-sm truncate ${conv.unreadCount > 0 ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>{other.name}</h3>
            {item.ownerId === currentUserId && (
              <span className="text-[10px] px-1.5 rounded-full bg-orange-100 text-orange-700">
                My item
              </span>
            )}
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
               {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src={item.image} className="w-4 h-4 rounded object-cover" />
            <span className="text-xs font-medium text-gray-700 truncate">{item.title}</span>
            <span className={`text-[10px] px-1.5 rounded-full ${item.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {item.status}
            </span>
          </div>
          <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
            {conv.lastMessage}
          </p>
        </div>
        {conv.unreadCount > 0 && (
          <div className="flex flex-col justify-center">
             <span className="w-2.5 h-2.5 bg-primary-600 rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );
};
