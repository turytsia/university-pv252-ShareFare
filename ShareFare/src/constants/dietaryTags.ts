export const DIETARY_TAGS = [
  "Spicy",
  "Nut-Free",
  "Vegan",
  "Vegetarian",
  "Organic",
  "Gluten-Free",
] as const;

export type DietaryTag = (typeof DIETARY_TAGS)[number];
