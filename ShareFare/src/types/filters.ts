export type CategoryFilter =
  | "All"
  | "Produce"
  | "Dairy"
  | "Prepared Food"
  | "Pantry"
  | "Baked Goods"
  | "Other";

export interface Filters {
  maxDistance: number;
  pickupTime: "any" | "today" | "tomorrow" | "this-week" | "flexible";
  dietary: string[];
  verifiedOnly: boolean;
  sealedPackageOnly: boolean;
  minCompletionRate: number;
}
