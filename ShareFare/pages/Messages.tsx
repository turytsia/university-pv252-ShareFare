import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, MessageSquare, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/Button';
import { ItemStatus } from '../types';
import { SurveyModal } from '../components/SurveyModal';
import { ConversationItem } from '../components/ConversationItem';

export const Messages = () => {
  const { 
    conversations, users, items, 
    messages, sendMessage, 
    currentUser, 
    markAsDonated, markAsReceived, markAsRead } = useAppContext();
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(conversationId != undefined ? conversationId : null );
  const [newMessage, setNewMessage] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [sortMode, setSortMode] = useState<string>(true);

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
  
  const activeConversation = conversations.find(c => c.id === selectedConversationId);
  const activeItem = activeConversation ? items.find(i => i.id === activeConversation.itemId) : null;
  const otherParticipantId = activeConversation?.participants.find(p => p !== currentUser?.id);
  const otherParticipant = otherParticipantId ? users[otherParticipantId] : null;

  const conversationMessages = messages.filter(m => m.conversationId === selectedConversationId).sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    if (selectedConversationId) {
      markAsRead(selectedConversationId);
    }
  }, [selectedConversationId]);

  const handleSend = () => {
    if(!newMessage.trim() || !selectedConversationId) return;
    sendMessage(selectedConversationId, newMessage);
    setNewMessage('');
  };

  const handleMarkAsDone = () => {
    setShowSurveyModal(true);
  };

  const submitSurvey = (rating: number, feedback: string) => {
    if (!activeItem || !activeConversation) return;
    
    if (activeItem.ownerId === currentUser?.id) {
       markAsDonated(activeItem.id, rating, feedback);
    } else {
       markAsReceived(activeItem.id, rating, feedback);
    }
    setShowSurveyModal(false);
    setSelectedConversationId(null);
  };

  const isConversationClosed = activeItem && (activeItem.status === ItemStatus.DONATED || activeItem.status === ItemStatus.RECEIVED);

  if (showSurveyModal && activeItem && otherParticipant) {
    return (
      <SurveyModal 
        activeItem={activeItem}
        otherParticipant={otherParticipant}
        isOwner={activeItem.ownerId === currentUser?.id}
        onClose={() => setShowSurveyModal(false)}
        onSubmit={submitSurvey}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
      <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Messages</h2>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value)}
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
                onClick={() => setSelectedConversationId(conv.id)}
              />
            );
          })}
        </div>
      </div>

      {activeConversation && activeItem && otherParticipant ? (
        <div className={`flex-1 flex flex-col ${selectedConversationId ? 'flex' : 'hidden md:flex'}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <button className="md:hidden" onClick={() => setSelectedConversationId(null)}><ChevronLeft/></button>
               <img src={otherParticipant.avatar} className="w-10 h-10 rounded-full" />
               <div>
                 <h3 className="font-bold text-gray-900">{otherParticipant.name}</h3>
                 <p className="text-xs text-gray-500">Usually responds in ~20 min</p>
               </div>
             </div>
             <Button variant="outline" size="sm" onClick={() => navigate(`/item/${activeItem.id}`)}>View Item</Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
             <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3 max-w-sm mx-auto mb-4">
                <img src={activeItem.image} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                   <h4 className="font-bold text-sm text-gray-900">{activeItem.title}</h4>
                   <p className="text-xs text-green-600 font-medium capitalize">{activeItem.status}</p>
                </div>
             </div>

             {conversationMessages.map(msg => {
               const isMe = msg.senderId === currentUser?.id;
               return (
                 <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                   {!isMe && <img src={otherParticipant.avatar} className="w-8 h-8 rounded-full mr-2 self-end" />}
                   <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                     isMe 
                       ? 'bg-primary-600 text-white rounded-br-none' 
                       : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                   }`}>
                     {msg.text}
                   </div>
                 </div>
               );
             })}

             <div className="flex justify-center pt-4">
                {activeItem.status === ItemStatus.PENDING && (
                  <>
                    {activeItem.ownerId === currentUser?.id && (
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center w-full max-w-sm">
                        <p className="text-sm text-gray-600 mb-3">Has {otherParticipant.name} picked up the item?</p>
                        <Button fullWidth onClick={handleMarkAsDone}>Mark as Picked Up</Button>
                      </div>
                    )}
                  </>
                )}
                {activeItem.status === ItemStatus.CLAIMED && activeItem.claimedById === currentUser?.id && (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center w-full max-w-sm">
                      <p className="text-sm text-green-800 mb-3 font-medium">Pickup completed. Please leave feedback for {otherParticipant.name}.</p>
                      <Button fullWidth onClick={() => setShowSurveyModal(true)} variant="primary">Leave Feedback</Button>
                    </div>
                )}
                {isConversationClosed && (
                   <div className="text-center text-gray-500 text-xs py-2 bg-gray-100 rounded-full px-4">
                      This conversation has been closed.
                   </div>
                )}
             </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            {isConversationClosed ? (
               <div className="text-center text-gray-400 text-sm">You cannot reply to this conversation</div>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white text-gray-900"
                />
                <button 
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5 pl-0.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 flex-col">
          <MessageSquare className="w-16 h-16 mb-4 text-gray-200" />
          <p>Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
};
