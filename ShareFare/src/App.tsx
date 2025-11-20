import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AddItemPage from './components/AddItemPage';
import LoginPage from './components/LoginPage';
import MessagesPage from './components/MessagesPage';
import ItemDetailsModal from './components/ItemDetailsModal';
import Toast from './components/Toast';
import { currentUser, mockFoodItems, mockMessages } from './mockData';
import type { FoodItem, Message } from './types';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState<FoodItem[]>(mockFoodItems);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showMessages, setShowMessages] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleClaimItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Update item status
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === itemId
          ? { ...i, status: 'claimed' as const, claimedBy: currentUser.id }
          : i
      )
    );

    // Create a new message conversation with the item owner
    const existingMessage = messages.find(
      (m) => m.itemId === itemId && m.otherUser.id === item.listedBy.id
    );

    if (!existingMessage) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        itemId: item.id,
        item: { ...item, status: 'claimed' as const, claimedBy: currentUser.id },
        otherUser: item.listedBy,
        lastMessage: `Hi! I'd like to claim your ${item.title}.`,
        timestamp: 'Just now',
        unreadCount: 0,
        status: 'pending',
        isOwner: false,
        messages: [
          {
            id: `chat-${Date.now()}`,
            senderId: currentUser.id,
            text: `Hi! I'd like to claim your ${item.title}.`,
            timestamp: new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            }),
          },
        ],
      };
      setMessages((prev) => [newMessage, ...prev]);
    }

    // Show success toast
    setToast({
      message: `Successfully claimed "${item.title}"! The owner will be notified.`,
      type: 'success',
    });
  };

  const handleContactUser = (userId: string) => {
    alert(`Opening chat with user ${userId}`);
    setShowMessages(true);
  };

  const handleSendMessage = (messageId: string, text: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              messages: [
                ...msg.messages,
                {
                  id: `chat-${Date.now()}`,
                  senderId: currentUser.id,
                  text,
                  timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  }),
                },
              ],
              lastMessage: text,
              timestamp: 'Just now',
            }
          : msg
      )
    );
  };

  const handleCompletePickup = (messageId: string) => {
    // Update message status to 'completed'
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: 'completed' as const,
              messages: [
                ...msg.messages,
                {
                  id: `chat-${Date.now()}-system`,
                  senderId: 'system',
                  text: 'Pickup has been completed. Please leave feedback for the other user.',
                  timestamp: new Date().toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  }),
                },
              ],
              lastMessage: 'Pickup completed',
              timestamp: 'Just now',
            }
          : msg
      )
    );

    // Update item status to 'completed'
    setItems((prevItems) =>
      prevItems.map((item) => {
        const message = messages.find((m) => m.id === messageId);
        return message && item.id === message.itemId
          ? { ...item, status: 'completed' as const }
          : item;
      })
    );

    setToast({
      message: 'Pickup marked as completed! The claimer will be prompted to leave feedback.',
      type: 'success',
    });
  };

  const handleSubmitOwnerFeedback = (
    messageId: string,
    feedback: {
      responseTime: number;
      comment: string;
    }
  ) => {
    // Update message to mark owner feedback as given
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              ownerFeedbackGiven: true,
            }
          : msg
      )
    );

    // In a real app, this would send feedback to the backend
    console.log('Owner feedback submitted:', feedback);

    setToast({
      message: 'Thank you for your feedback!',
      type: 'success',
    });
  };

  const handleSubmitClaimerFeedback = (
    messageId: string,
    feedback: {
      responseTime: number;
      packagingQuality: number;
      contentsQuality: number;
      comment: string;
    }
  ) => {
    // Update message to mark claimer feedback as given
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              claimerFeedbackGiven: true,
              status: 'feedback-given' as const,
            }
          : msg
      )
    );

    // In a real app, this would send feedback to the backend
    console.log('Claimer feedback submitted:', feedback);

    setToast({
      message: 'Thank you for your feedback!',
      type: 'success',
    });
  };

  const unreadCount = messages.filter((m) => m.unreadCount > 0).length;
  const userItems = items.filter((item) => item.listedBy.id === currentUser.id);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showMessages) {
    return (
      <MessagesPage
        messages={messages}
        onBack={() => setShowMessages(false)}
        onSendMessage={handleSendMessage}
        onCompletePickup={handleCompletePickup}
        onSubmitOwnerFeedback={handleSubmitOwnerFeedback}
        onSubmitClaimerFeedback={handleSubmitClaimerFeedback}
      />
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header onOpenMessages={() => setShowMessages(true)} unreadCount={unreadCount} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  items={items}
                  onClaimItem={handleClaimItem}
                  onViewItem={setSelectedItem}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage user={currentUser} userItems={userItems} />}
            />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {selectedItem && (
          <ItemDetailsModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onClaim={handleClaimItem}
            onContact={handleContactUser}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
