export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  const dateFormat = new Intl.DateTimeFormat("en-US", options);
  return dateFormat.format(date);
};

export const getOffsetDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

export const isExpired = (expiryDateStr: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day for comparison
  const expiryDate = new Date(expiryDateStr);
  return expiryDate < today;
};
