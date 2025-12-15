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
