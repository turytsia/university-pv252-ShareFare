import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ConversationItem } from './ConversationItem';

interface ConversationsListProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  sortMode: string;
  onSortModeChange: (mode: string) => void;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  selectedConversationId,
  onSelectConversation,
  sortMode,
  onSortModeChange,
}) => {
  const { conversations, users, items, currentUser } = useAppContext();

  const myConversations = conversations.filter(
    c => c.participants.includes(currentUser?.id || '')
  ).sort((a, b) => {
    const itemA = items.find(i => i.id === a.itemId);
    const itemB = items.find(i => i.id === b.itemId);
    const isMyItemA = itemA?.ownerId === currentUser?.id;
    const isMyItemB = itemB?.ownerId === currentUser?.id;

    // Primary sort: my items first or last based on sortMyItemsFirst
    if (sortMode == 'first') {
      if (isMyItemA && !isMyItemB) return -1;
      if (!isMyItemA && isMyItemB) return 1;
    } else if (sortMode == 'last') {
      if (isMyItemA && !isMyItemB) return 1;
      if (!isMyItemA && isMyItemB) return -1;
    }

    // Secondary sort: by last message timestamp (newest first)
    return b.lastMessageTimestamp - a.lastMessageTimestamp;
  });

  return (
    <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-lg">Messages</h2>
          <select
            value={sortMode}
            onChange={(e) => onSortModeChange(e.target.value)}
            className="text-xs px-2 py-1 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="date">Most recent first</option>
            <option value="first">My items first</option>
            <option value="last">My items last</option>
          </select>
        </div>
        <p className="text-xs text-gray-500">{myConversations.filter(c => c.unreadCount > 0).length} unread</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {myConversations.length === 0 && <div className="p-8 text-center text-gray-500 text-sm">No messages yet. Claim an item to start chatting!</div>}
        {myConversations.map(conv => {
          const item = items.find(i => i.id === conv.itemId);
          const otherId = conv.participants.find(p => p !== currentUser?.id);
          const other = otherId ? users[otherId] : null;
          if (!item || !other) return null;

          return (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              item={item}
              otherUser={other}
              currentUserId={currentUser?.id || ''}
              isSelected={selectedConversationId === conv.id}
              onClick={() => onSelectConversation(conv.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
