import { LOCAL_STORAGE_KEY } from "./constants";

export function getInitialFilterState(
  key: string,
  defaultValue: boolean,
): boolean {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    return defaultValue;
  }
  try {
    const parsed = JSON.parse(saved);
    return parsed[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export function saveFiltersToLocalStorage(filters: {
  showMyItems: boolean;
  showExpired: boolean;
}): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filters));
}

export function formatCurrentDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
