export enum ItemStatus {
  AVAILABLE = 'available',
  PENDING = 'pending', // Claimed but not picked up
  CLAIMED = 'claimed', // Used for UI display mostly (Owner marked as done, waiting for receiver)
  DONATED = 'donated', // Final state for owner
  RECEIVED = 'received', // Final state for receiver
}

export enum DietaryType {
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  GLUTEN_FREE = 'Gluten-Free',
  NUT_FREE = 'Nut-Free',
  ORGANIC = 'Organic',
  DAIRY = 'Dairy',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  coords: { x: number; y: number }; // Simplified coords for distance
  stats: {
    shared: number;
    helped: number;
    received: number;
    wasteReduced: number;
  };
  verified?: boolean;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  quantity: string;
  expiryDate: string;
  pickupTime: string;
  category: string;
  image: string;
  ownerId: string;
  claimedById?: string;
  status: ItemStatus;
  distance: number; // Calculated relative to current user
  tags: string[];
  locationName: string;
  completionRate?: number; // Mock data for owner reliability
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface Conversation {
  id: string;
  itemId: string;
  participants: string[]; // [ownerId, claimerId]
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: number;
}