import { MAX_FILE_SIZE_BYTES, ALLOWED_IMAGE_TYPES_REGEX } from "./constants";

export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  if (!file.type.match(ALLOWED_IMAGE_TYPES_REGEX)) {
    return {
      valid: false,
      error: "Please select a valid image file (PNG, JPG)",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  return { valid: true };
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function generatePlaceholderImageUrl(): string {
  return `https://loremflickr.com/400/300/food?random=${Date.now()}`;
}

export function toggleArrayItem<T>(array: Array<T>, item: T): Array<T> {
  if (array.includes(item)) {
    return array.filter((i) => i !== item);
  }
  return [...array, item];
}
