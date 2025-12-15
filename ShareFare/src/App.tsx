import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AddItemPage from "./pages/AddItemPage";
import ViewItemPage from "./pages/ViewItemPage";
import LoginPage from "./pages/LoginPage";
import MessagesPage from "./pages/MessagesPage";
import ItemDetailsModal from "./components/ItemDetailsModal";
import Toast from "./components/Toast";
import { currentUser, mockFoodItems, mockMessages } from "./mockData";
import type { FoodItem, Message } from "./types";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState<FoodItem[]>(mockFoodItems);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAddItem = (newItem: Omit<FoodItem, "id" | "listedBy">) => {
    const itemWithId: FoodItem = {
      ...newItem,
      id: `item-${Date.now()}`,
      listedBy: currentUser,
    };

    setItems((prevItems) => [itemWithId, ...prevItems]);

    setToast({
      message: `Successfully listed "${itemWithId.title}"!`,
      type: "success",
    });
  };

  const handleMarkAsClaimed = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    // Update item status to claimed
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === itemId ? { ...i, status: "claimed" as const } : i,
      ),
    );

    // Show success toast
    setToast({
      message: `"${item.title}" has been marked as claimed.`,
      type: "success",
    });
  };

  const handleClaimItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    // Update item status
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === itemId
          ? {
              ...i,
              status: "claimed" as const,
              claimedBy: currentUser.id,
            }
          : i,
      ),
    );

    // Create a new message conversation with the item owner
    const existingMessage = messages.find(
      (m) => m.itemId === itemId && m.otherUser.id === item.listedBy.id,
    );

    if (!existingMessage) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        itemId: item.id,
        item: {
          ...item,
          status: "claimed" as const,
          claimedBy: currentUser.id,
        },
        otherUser: item.listedBy,
        lastMessage: `Hi! I'd like to claim your ${item.title}.`,
        timestamp: "Just now",
        unreadCount: 0,
        status: "pending",
        isOwner: false,
        messages: [
          {
            id: `chat-${Date.now()}`,
            senderId: currentUser.id,
            text: `Hi! I'd like to claim your ${item.title}.`,
            timestamp: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
          },
        ],
      };
      setMessages((prev) => [newMessage, ...prev]);
    }

    // Show success toast
    setToast({
      message: `Successfully claimed "${item.title}"! The owner will be notified.`,
      type: "success",
    });
  };

  const handleContactUser = (userId: string, itemId?: string) => {
    // If itemId is provided, find or create a message for this item
    if (itemId) {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        // Check if a conversation already exists for this item
        const existingMessage = messages.find(
          (m) => m.itemId === itemId && m.otherUser.id === userId,
        );

        if (!existingMessage) {
          // Create a new message conversation
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
            itemId: item.id,
            item: item,
            otherUser: item.listedBy,
            lastMessage: "",
            timestamp: "Just now",
            unreadCount: 0,
            status: "pending",
            isOwner: false,
            messages: [],
          };
          setMessages((prev) => [newMessage, ...prev]);
        }
      }
    }
    // Navigation to messages will be handled by the component
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
                  timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  }),
                },
              ],
              lastMessage: text,
              timestamp: "Just now",
            }
          : msg,
      ),
    );
  };

  const handleCompletePickup = (messageId: string) => {
    // Update message status to 'completed'
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: "completed" as const,
              messages: [
                ...msg.messages,
                {
                  id: `chat-${Date.now()}-system`,
                  senderId: "system",
                  text: "Pickup has been completed. Please leave feedback for the other user.",
                  timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  }),
                },
              ],
              lastMessage: "Pickup completed",
              timestamp: "Just now",
            }
          : msg,
      ),
    );

    // Update item status to 'completed'
    setItems((prevItems) =>
      prevItems.map((item) => {
        const message = messages.find((m) => m.id === messageId);
        return message && item.id === message.itemId
          ? { ...item, status: "completed" as const }
          : item;
      }),
    );

    setToast({
      message:
        "Pickup marked as completed! The claimer will be prompted to leave feedback.",
      type: "success",
    });
  };

  const handleSubmitOwnerFeedback = (
    messageId: string,
    feedback: {
      responseTime: number;
      comment: string;
    },
  ) => {
    // Update message to mark owner feedback as given
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              ownerFeedbackGiven: true,
            }
          : msg,
      ),
    );

    // In a real app, this would send feedback to the backend
    console.log("Owner feedback submitted:", feedback);

    setToast({
      message: "Thank you for your feedback!",
      type: "success",
    });
  };

  const handleSubmitClaimerFeedback = (
    messageId: string,
    feedback: {
      responseTime: number;
      packagingQuality: number;
      contentsQuality: number;
      comment: string;
    },
  ) => {
    // Update message to mark claimer feedback as given
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              claimerFeedbackGiven: true,
              status: "feedback-given" as const,
            }
          : msg,
      ),
    );

    // In a real app, this would send feedback to the backend
    console.log("Claimer feedback submitted:", feedback);

    setToast({
      message: "Thank you for your feedback!",
      type: "success",
    });
  };

  const unreadCount = messages.filter((m) => m.unreadCount > 0).length;
  const userItems = items.filter((item) => item.listedBy.id === currentUser.id);

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <AppContent
        items={items}
        messages={messages}
        selectedItem={selectedItem}
        toast={toast}
        currentUser={currentUser}
        unreadCount={unreadCount}
        userItems={userItems}
        handleAddItem={handleAddItem}
        handleClaimItem={handleClaimItem}
        handleMarkAsClaimed={handleMarkAsClaimed}
        handleContactUser={handleContactUser}
        handleSendMessage={handleSendMessage}
        handleCompletePickup={handleCompletePickup}
        handleSubmitOwnerFeedback={handleSubmitOwnerFeedback}
        handleSubmitClaimerFeedback={handleSubmitClaimerFeedback}
        setSelectedItem={setSelectedItem}
        setToast={setToast}
      />
    </BrowserRouter>
  );
}

interface AppContentProps {
  items: FoodItem[];
  messages: Message[];
  selectedItem: FoodItem | null;
  toast: { message: string; type: "success" | "error" | "info" } | null;
  currentUser: typeof import("./mockData").currentUser;
  unreadCount: number;
  userItems: FoodItem[];
  handleAddItem: (newItem: Omit<FoodItem, "id" | "listedBy">) => void;
  handleClaimItem: (itemId: string) => void;
  handleMarkAsClaimed: (itemId: string) => void;
  handleContactUser: (userId: string, itemId?: string) => void;
  handleSendMessage: (messageId: string, text: string) => void;
  handleCompletePickup: (messageId: string) => void;
  handleSubmitOwnerFeedback: (
    messageId: string,
    feedback: { responseTime: number; comment: string },
  ) => void;
  handleSubmitClaimerFeedback: (
    messageId: string,
    feedback: {
      responseTime: number;
      packagingQuality: number;
      contentsQuality: number;
      comment: string;
    },
  ) => void;
  setSelectedItem: (item: FoodItem | null) => void;
  setToast: (
    toast: { message: string; type: "success" | "error" | "info" } | null,
  ) => void;
}

function AppContent({
  items,
  messages,
  selectedItem,
  toast,
  currentUser,
  unreadCount,
  userItems,
  handleAddItem,
  handleClaimItem,
  handleMarkAsClaimed,
  handleContactUser,
  handleSendMessage,
  handleCompletePickup,
  handleSubmitOwnerFeedback,
  handleSubmitClaimerFeedback,
  setSelectedItem,
  setToast,
}: AppContentProps) {
  const navigate = useNavigate();

  return (
    <div className="app">
      <Header
        onOpenMessages={() => navigate("/messages")}
        unreadCount={unreadCount}
      />
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
            element={
              <ProfilePage
                user={currentUser}
                userItems={userItems}
                onMarkAsClaimed={handleMarkAsClaimed}
              />
            }
          />
          <Route
            path="/add-item"
            element={<AddItemPage onAddItem={handleAddItem} />}
          />
          <Route
            path="/item/:itemId"
            element={
              <ViewItemPage
                items={items}
                onClaim={handleClaimItem}
                onContact={handleContactUser}
              />
            }
          />
          <Route
            path="/messages"
            element={
              <MessagesPage
                messages={messages}
                onSendMessage={handleSendMessage}
                onCompletePickup={handleCompletePickup}
                onSubmitOwnerFeedback={handleSubmitOwnerFeedback}
                onSubmitClaimerFeedback={handleSubmitClaimerFeedback}
              />
            }
          />
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
  );
}

export default App;
