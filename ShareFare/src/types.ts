export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  completionRate: number;
  responseTime: string;
  memberSince: string;
  verified: boolean;
  stats: {
    itemsShared: number;
    peopleHelped: number;
    itemsReceived: number;
    wasteReduced: number; // in lbs
  };
}

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: string;
  category: 'Produce' | 'Dairy' | 'Prepared Food' | 'Pantry' | 'Baked Goods' | 'Other';
  image: string;
  dietaryTags: string[];
  bestBy: string;
  pickupWindow: string;
  location: string;
  distance: number; // in miles
  exactAddress?: string;
  listedBy: User;
  status: 'available' | 'claimed' | 'completed';
  claimedBy?: string;
}

export interface Message {
  id: string;
  itemId: string;
  item: FoodItem;
  otherUser: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
  status: 'pending' | 'completed' | 'feedback-given';
  isOwner: boolean; // Is the current user the owner of the item
  ownerFeedbackGiven?: boolean; // Has the owner submitted their feedback
  claimerFeedbackGiven?: boolean; // Has the claimer submitted their feedback
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type?: 'system' | 'user';
}

export interface Feedback {
  messageId: string;
  fromUserId: string;
  toUserId: string;
  responseTime: number; // 1-5
  packagingQuality: number; // 1-5
  contentsQuality: number; // 1-5
  comment?: string;
}

export type CategoryFilter = 'All' | 'Produce' | 'Dairy' | 'Prepared Food' | 'Pantry' | 'Baked Goods' | 'Other';

export interface Filters {
  maxDistance: number;
  pickupTime: 'any' | 'today' | 'tomorrow' | 'this-week' | 'flexible';
  dietary: string[];
  verifiedOnly: boolean;
  sealedPackageOnly: boolean;
  minCompletionRate: number;
}
