import type { User } from "./user";

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  quantity: string;
  category:
    | "Produce"
    | "Dairy"
    | "Prepared Food"
    | "Pantry"
    | "Baked Goods"
    | "Other";
  image: string;
  dietaryTags: string[];
  bestBy: string;
  pickupWindow: string;
  distance: number; // in kilometers
  exactAddress?: string;
  listedBy: User;
  status: "available" | "claimed" | "completed";
  claimedBy?: string;
}

export type SortOption = "relevance" | "distance" | "best-by" | "recent";

const monthOrder: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseBestBy = (value: string) => {
  const [mon, day] = value.split(" ");
  const monthIndex = monthOrder[mon as keyof typeof monthOrder] ?? 0;
  const dayNum = Number.parseInt(day ?? "1", 10);
  return monthIndex * 31 + (Number.isNaN(dayNum) ? 0 : dayNum);
};

const getIdTime = (id: string) => {
  const parts = id.split("-");
  const last = parts[parts.length - 1];
  const num = Number.parseInt(last, 10);
  return Number.isNaN(num) ? 0 : num;
};

export function sortFoodItems(
  items: FoodItem[],
  sortBy: SortOption,
): FoodItem[] {
  if (sortBy === "relevance") return items;

  const sorted = [...items];

  if (sortBy === "distance") {
    sorted.sort((a, b) => a.distance - b.distance);
  } else if (sortBy === "best-by") {
    sorted.sort((a, b) => parseBestBy(a.bestBy) - parseBestBy(b.bestBy));
  } else if (sortBy === "recent") {
    sorted.sort((a, b) => getIdTime(b.id) - getIdTime(a.id));
  }

  return sorted;
}
