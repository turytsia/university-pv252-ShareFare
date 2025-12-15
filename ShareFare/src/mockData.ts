import type { User } from "./types/user";
import type { FoodItem } from "./types/items";
import type { Message } from "./types/messages";

// Mock current user
export const currentUser: User = {
  id: "user-1",
  name: "Sarah Chen",
  email: "sarah@example.com",
  location: "Downtown Berkeley, CA",
  bio: "Student passionate about reducing food waste! I love cooking and often have extra produce from the farmers market.",
  avatar: "https://i.pravatar.cc/150?img=5",
  completionRate: 98,
  responseTime: "~20 min",
  memberSince: "January 2024",
  verified: true,
  stats: {
    itemsShared: 45,
    peopleHelped: 38,
    itemsReceived: 23,
    wasteReduced: 127,
  },
};

// Mock users
export const users: User[] = [
  currentUser,
  {
    id: "user-2",
    name: "Mike Chen",
    email: "mike@example.com",
    location: "Downtown Berkeley, CA",
    bio: "Love to share!",
    avatar: "https://i.pravatar.cc/150?img=12",
    completionRate: 98,
    responseTime: "~20 min",
    memberSince: "January 2024",
    verified: true,
    stats: {
      itemsShared: 32,
      peopleHelped: 28,
      itemsReceived: 15,
      wasteReduced: 89,
    },
  },
  {
    id: "user-3",
    name: "Emma John",
    email: "emma@example.com",
    location: "Oakland, CA",
    bio: "Community member",
    avatar: "https://i.pravatar.cc/150?img=9",
    completionRate: 85,
    responseTime: "~2 hours",
    memberSince: "March 2024",
    verified: false,
    stats: {
      itemsShared: 12,
      peopleHelped: 10,
      itemsReceived: 8,
      wasteReduced: 34,
    },
  },
  {
    id: "user-4",
    name: "Mike Torres",
    email: "torres@example.com",
    location: "Berkeley Hills, CA",
    bio: "Baker and food enthusiast",
    avatar: "https://i.pravatar.cc/150?img=13",
    completionRate: 92,
    responseTime: "~20 min",
    memberSince: "February 2024",
    verified: true,
    stats: {
      itemsShared: 28,
      peopleHelped: 24,
      itemsReceived: 12,
      wasteReduced: 67,
    },
  },
  {
    id: "user-5",
    name: "James Park",
    email: "james@example.com",
    location: "North Berkeley, CA",
    bio: "Love homemade food",
    avatar: "https://i.pravatar.cc/150?img=14",
    completionRate: 95,
    responseTime: "~1 hour",
    memberSince: "December 2023",
    verified: true,
    stats: {
      itemsShared: 56,
      peopleHelped: 45,
      itemsReceived: 34,
      wasteReduced: 156,
    },
  },
];

// Mock food items
export const mockFoodItems: FoodItem[] = [
  {
    id: "item-1",
    title: "Fresh Tomatoes & Cucumbers",
    description: "2 lbs tomatoes, 3 cucumbers",
    quantity: "2 lbs tomatoes, 3 cucumbers",
    category: "Produce",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
    dietaryTags: ["Vegan", "Organic"],
    bestBy: "Nov 7",
    pickupWindow: "Today 4-7pm",
    distance: 0.3,
    exactAddress: "1234 University Ave, Berkeley, CA",
    listedBy: currentUser,
    status: "available",
  },
  {
    id: "item-2",
    title: "Homemade Banana Bread",
    description: "1 full loaf",
    quantity: "1 full loaf",
    category: "Baked Goods",
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&q=80",
    dietaryTags: ["Vegetarian"],
    bestBy: "Nov 6",
    pickupWindow: "Tomorrow 9am-12pm",
    distance: 0.5,
    exactAddress: "5678 College Ave, Berkeley, CA",
    listedBy: users[1],
    status: "available",
  },
  {
    id: "item-3",
    title: "Milk & Yogurt (unopened)",
    description: "1 gallon milk, 4 yogurt cups",
    quantity: "1 gallon milk, 4 yogurt cups",
    category: "Dairy",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
    dietaryTags: ["Vegetarian"],
    bestBy: "Nov 8",
    pickupWindow: "Today 5-8pm",
    distance: 0.8,
    exactAddress: "910 Shattuck Ave, Berkeley, CA",
    listedBy: users[2],
    status: "available",
  },
  {
    id: "item-4",
    title: "Homemade Granola",
    description: "2 jars",
    quantity: "2 jars",
    category: "Baked Goods",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&q=80",
    dietaryTags: ["Vegan", "Organic"],
    bestBy: "Nov 15",
    pickupWindow: "This weekend",
    distance: 1.2,
    exactAddress: "2345 Telegraph Ave, Berkeley, CA",
    listedBy: users[4],
    status: "available",
  },
  {
    id: "item-5",
    title: "Rice, Pasta & Canned Goods",
    description: "Assorted pantry items",
    quantity: "Assorted pantry items",
    category: "Pantry",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    dietaryTags: ["Vegan"],
    bestBy: "Dec 2024",
    pickupWindow: "Flexible schedule",
    distance: 0.6,
    listedBy: users[1],
    status: "claimed",
    claimedBy: "user-3",
  },
];

// Mock messages
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    itemId: "item-1",
    item: mockFoodItems[0],
    otherUser: users[3], // Mike Torres
    lastMessage: "Perfect! What time works for pickup?",
    timestamp: "2m ago",
    unreadCount: 2,
    status: "pending",
    isOwner: true, // Sarah owns the tomatoes item
    messages: [
      {
        id: "chat-1",
        senderId: "user-4",
        text: "Hi! Are the tomatoes still available?",
        timestamp: "10:25 AM",
      },
      {
        id: "chat-2",
        senderId: "user-1",
        text: "Yes, they are! Fresh from the farmers market this morning 🍅",
        timestamp: "10:25 AM",
      },
      {
        id: "chat-3",
        senderId: "user-4",
        text: "Perfect! What time works for pickup?",
        timestamp: "10:25 AM",
      },
    ],
  },
  {
    id: "msg-2",
    itemId: "item-5",
    item: mockFoodItems[4],
    otherUser: users[2],
    lastMessage: "Yes.",
    timestamp: "1h ago",
    unreadCount: 0,
    status: "pending",
    isOwner: true,
    messages: [
      {
        id: "chat-4",
        senderId: "user-3",
        text: "Hi! Is the granola still available?",
        timestamp: "9:15 AM",
      },
      {
        id: "chat-5",
        senderId: "user-1",
        text: "Yes! Would you like to pick it up this weekend?",
        timestamp: "9:20 AM",
      },
      {
        id: "chat-6",
        senderId: "user-3",
        text: "Yes.",
        timestamp: "9:22 AM",
      },
    ],
  },
  {
    id: "msg-3",
    itemId: "item-4",
    item: mockFoodItems[3],
    otherUser: users[4],
    lastMessage: "Is this still available?",
    timestamp: "2h ago",
    unreadCount: 1,
    status: "pending",
    isOwner: true,
    messages: [
      {
        id: "chat-7",
        senderId: "user-5",
        text: "Is this still available?",
        timestamp: "8:45 AM",
      },
    ],
  },
  {
    id: "msg-4",
    itemId: "item-2",
    item: mockFoodItems[1], // Banana Bread owned by Mike Chen (user-2)
    otherUser: users[1], // Mike Chen
    lastMessage:
      "Pickup has been completed. Please leave feedback for the other user.",
    timestamp: "30m ago",
    unreadCount: 0,
    status: "completed",
    isOwner: false, // Sarah is the claimer, not the owner
    ownerFeedbackGiven: true, // Mike Chen (owner) already gave feedback
    claimerFeedbackGiven: false, // Sarah hasn't given feedback yet
    messages: [
      {
        id: "chat-8",
        senderId: "user-1",
        text: "Hi! Can I claim the banana bread?",
        timestamp: "9:00 AM",
      },
      {
        id: "chat-9",
        senderId: "user-2",
        text: "Sure! When can you pick it up?",
        timestamp: "9:05 AM",
      },
      {
        id: "chat-10",
        senderId: "user-1",
        text: "How about tomorrow morning?",
        timestamp: "9:10 AM",
      },
      {
        id: "chat-11",
        senderId: "user-2",
        text: "Perfect! See you then.",
        timestamp: "9:15 AM",
      },
      {
        id: "chat-12",
        senderId: "system",
        text: "Pickup has been completed. Please leave feedback for the other user.",
        timestamp: "10:30 AM",
      },
    ],
  },
];
