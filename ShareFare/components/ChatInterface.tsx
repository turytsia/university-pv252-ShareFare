import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';
import { ItemStatus } from '../types';
import { SurveyModal } from './SurveyModal';
import { UserProfileModal } from './UserProfileModal';

interface ChatInterfaceProps {
  selectedConversationId: string | null;
  onBack: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedConversationId,
  onBack,
}) => {
  const {
    conversations, users, items, messages,
    sendMessage, currentUser,
    markAsDonated, markAsReceived, markAsRead
  } = useAppContext();
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

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
    if (!newMessage.trim() || !selectedConversationId) return;
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
    onBack();
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

  if (!activeConversation || !activeItem || !otherParticipant) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 flex-col">
        <div className="w-16 h-16 mb-4 text-gray-200 flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${selectedConversationId ? 'flex' : 'hidden md:flex'}`}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={onBack}><ChevronLeft /></button>
          <button onClick={() => setShowUserProfile(true)} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={otherParticipant.avatar} className="w-10 h-10 rounded-full" />
            <div className="text-left">
              <h3 className="font-bold text-gray-900">{otherParticipant.name}</h3>
              <p className="text-xs text-gray-500">Usually responds in ~20 min</p>
            </div>
          </button>
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
              <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMe
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
          <div className="text-center text-gray-400 text-sm">The conversation is closed</div>
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

      {showUserProfile && otherParticipant && (
        <UserProfileModal user={otherParticipant} onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
};
