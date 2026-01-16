import { User, Item, ItemStatus, Conversation, Message, DietaryType } from './types';

export const CURRENT_USER_ID = 'u1';

export const MOCK_USERS: Record<string, User> = {
  u1: {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Downtown Berkeley, CA',
    coords: { x: 0, y: 0 },
    stats: { shared: 45, helped: 38, received: 23, wasteReduced: 127 },
    verified: true,
  },
  u2: {
    id: 'u2',
    name: 'Mike Torres',
    email: 'mike@test.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'North Berkeley, CA',
    coords: { x: 0.3, y: 0.2 }, // Close
    stats: { shared: 10, helped: 5, received: 2, wasteReduced: 30 },
    verified: true,
  },
  u3: {
    id: 'u3',
    name: 'Emma Johnson',
    email: 'emma@test.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Oakland, CA',
    coords: { x: 0.8, y: 0.5 },
    stats: { shared: 22, helped: 15, received: 8, wasteReduced: 60 },
    verified: false,
  },
  u4: {
    id: 'u4',
    name: 'James Park',
    email: 'james@test.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    location: 'Albany, CA',
    coords: { x: 1.2, y: 0.1 },
    stats: { shared: 5, helped: 20, received: 15, wasteReduced: 10 },
    verified: true,
  }
};

// Initial Items
// 1. My item (Sarah), claimed by James. Status: Pending.
// 2. Item I claimed (from Mike). Status: Claimed (Waiting for feedback).
// 3. Available items.

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'i1',
    title: 'Fresh Tomatoes & Cucumbers',
    description: '2 lbs tomatoes, 3 cucumbers. Fresh from my garden!',
    quantity: '1 bag',
    expiryDate: 'Nov 7',
    pickupTime: 'Today 4-7pm',
    category: 'Produce',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    ownerId: 'u1', // ME
    claimedById: 'u4', // James
    status: ItemStatus.PENDING,
    distance: 0,
    tags: [DietaryType.VEGAN, DietaryType.ORGANIC],
    locationName: 'Downtown Berkeley, CA',
    completionRate: 98,
  },
  {
    id: 'i2',
    title: 'Homemade Banana Bread',
    description: '1 full loaf. Baked yesterday.',
    quantity: '1 loaf',
    expiryDate: 'Nov 6',
    pickupTime: 'Tomorrow 9am-12pm',
    category: 'Baked Goods',
    image: 'https://images.unsplash.com/photo-1596229562725-d9103c814b7e?auto=format&fit=crop&w=800&q=80',
    ownerId: 'u2', // Mike
    claimedById: 'u1', // ME
    status: ItemStatus.CLAIMED, // CHANGED from PENDING
    distance: 0.5,
    tags: [DietaryType.VEGETARIAN],
    locationName: 'North Berkeley, CA',
    completionRate: 92,
  },
  {
    id: 'i3',
    title: 'Milk & Yogurt (unopened)',
    description: '1 gallon milk, 4 yogurt cups. Moving out, need gone.',
    quantity: 'Mixed',
    expiryDate: 'Nov 8',
    pickupTime: 'Today 5-8pm',
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
    ownerId: 'u3', // Emma
    status: ItemStatus.AVAILABLE,
    distance: 0.8,
    tags: [DietaryType.VEGETARIAN],
    locationName: 'Oakland, CA',
    completionRate: 85,
  },
  {
    id: 'i4',
    title: 'Pasta & Canned Goods',
    description: 'Unopened box of penne and 2 cans of beans.',
    quantity: '3 items',
    expiryDate: 'Dec 2024',
    pickupTime: 'Flexible',
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80',
    ownerId: 'u3',
    status: ItemStatus.AVAILABLE,
    distance: 1.2,
    tags: [DietaryType.VEGAN],
    locationName: 'Oakland, CA',
    completionRate: 85,
  },
  {
    id: 'i5',
    title: 'Rice (5lb bag)',
    description: 'Unopened basmati rice.',
    quantity: '5 lbs',
    expiryDate: 'Jan 2025',
    pickupTime: 'Today 6-9pm',
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    ownerId: 'u4',
    status: ItemStatus.AVAILABLE,
    distance: 0.4,
    tags: [DietaryType.VEGAN, DietaryType.GLUTEN_FREE],
    locationName: 'Albany, CA',
    completionRate: 78,
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    itemId: 'i1',
    participants: ['u1', 'u4'], // Me and James
    lastMessage: 'Perfect! What time works for pickup?',
    lastMessageTimestamp: Date.now() - 3600000,
    unreadCount: 2,
  },
  {
    id: 'c2',
    itemId: 'i2',
    participants: ['u2', 'u1'], // Mike and Me
    lastMessage: 'See you then.',
    lastMessageTimestamp: Date.now() - 7200000,
    unreadCount: 1, // Changed to 1 to simulate unread state for testing
  }
];

export const INITIAL_MESSAGES: Message[] = [
  // Chat for Item 1 (My Tomatoes, James Claimed)
  { id: 'm1', conversationId: 'c1', senderId: 'u4', text: 'Hi! Are the tomatoes still available?', timestamp: Date.now() - 8000000 },
  { id: 'm2', conversationId: 'c1', senderId: 'u1', text: 'Yes they are! Fresh from the garden.', timestamp: Date.now() - 7000000 },
  { id: 'm3', conversationId: 'c1', senderId: 'u4', text: 'Perfect! What time works for pickup?', timestamp: Date.now() - 3600000 },
  
  // Chat for Item 2 (Mike's Bread, I Claimed)
  { id: 'm4', conversationId: 'c2', senderId: 'u1', text: 'Hi Mike, I would love the banana bread.', timestamp: Date.now() - 8200000 },
  { id: 'm5', conversationId: 'c2', senderId: 'u2', text: 'Sure thing, Sarah! Can you come tomorrow?', timestamp: Date.now() - 8100000 },
  { id: 'm6', conversationId: 'c2', senderId: 'u1', text: 'Yes, around 10am works.', timestamp: Date.now() - 7200000 },
  { id: 'm7', conversationId: 'c2', senderId: 'u2', text: 'See you then.', timestamp: Date.now() - 7200000 },
];