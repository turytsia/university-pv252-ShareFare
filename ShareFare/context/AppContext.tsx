import React, { useState } from 'react';
import { Item, User, Conversation, Message, ItemStatus } from '../types';
import { 
  INITIAL_ITEMS, 
  MOCK_USERS, 
  CURRENT_USER_ID, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES 
} from '../constants';

interface AppContextType {
  currentUser: User | null;
  items: Item[];
  users: Record<string, User>;
  conversations: Conversation[];
  messages: Message[];
  login: () => void;
  logout: () => void;
  addItem: (item: Omit<Item, 'id' | 'ownerId' | 'status' | 'distance' | 'completionRate'>) => void;
  updateItem: (id: string, data: Partial<Item>) => void;
  claimItem: (itemId: string) => void;
  markAsDonated: (itemId: string, rating: number, feedback: string) => void;
  markAsReceived: (itemId: string, rating: number, feedback: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  
  const login = () => {
    setCurrentUser(MOCK_USERS[CURRENT_USER_ID]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addItem = (newItemData: any) => {
    const newItem: Item = {
      ...newItemData,
      id: `i${Date.now()}`,
      ownerId: currentUser?.id || '',
      status: ItemStatus.AVAILABLE,
      distance: 0,
      completionRate: 100
    };
    setItems([newItem, ...items]);
  };

  const updateItem = (id: string, data: Partial<Item>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...data } : i));
  };

  const claimItem = (itemId: string) => {
    if (!currentUser) return;
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    updateItem(itemId, { status: ItemStatus.PENDING, claimedById: currentUser.id });

    const newConv: Conversation = {
      id: `c${Date.now()}`,
      itemId,
      participants: [item.ownerId, currentUser.id],
      lastMessage: 'Hi! Is this still available?', // TODO: use last message ID instead
      lastMessageTimestamp: Date.now(),
      unreadCount: 0
    };
    setConversations([newConv, ...conversations]);

    const msg: Message = {
      id: `m${Date.now()}`,
      conversationId: newConv.id,
      senderId: currentUser.id,
      text: 'Hi! Is this still available?',
      timestamp: Date.now()
    };
    setMessages([...messages, msg]);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!currentUser) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text,
      timestamp: Date.now()
    };
    setMessages([...messages, msg]);
    setConversations(conversations.map(c => 
      c.id === conversationId ? { ...c, lastMessage: text, lastMessageTimestamp: Date.now() } : c
    ));
  };

  const markAsRead = (conversationId: string) => {
     setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c));
  };

  const markAsDonated = (itemId: string, rating: number, feedback: string) => {
    updateItem(itemId, { status: ItemStatus.DONATED });
  };

  const markAsReceived = (itemId: string, rating: number, feedback: string) => {
    updateItem(itemId, { status: ItemStatus.RECEIVED }); 
  };

  return (
    <AppContext.Provider value={{ 
      currentUser, items, users: MOCK_USERS, conversations, messages, 
      login, logout, addItem, updateItem, claimItem, sendMessage,
      markAsDonated, markAsReceived, markAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};
