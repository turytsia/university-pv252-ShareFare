export interface Feedback {
  messageId: string;
  fromUserId: string;
  toUserId: string;
  responseTime: number; // 1-5
  packagingQuality: number; // 1-5
  contentsQuality: number; // 1-5
  comment?: string;
}
