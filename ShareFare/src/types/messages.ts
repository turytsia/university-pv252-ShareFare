import type { FoodItem } from "./items";
import type { User } from "./user";

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type?: "system" | "user";
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
  status: "pending" | "completed" | "feedback-given";
  isOwner: boolean; // Is the current user the owner of the item
  ownerFeedbackGiven?: boolean; // Has the owner submitted their feedback
  claimerFeedbackGiven?: boolean; // Has the claimer submitted their feedback
}
