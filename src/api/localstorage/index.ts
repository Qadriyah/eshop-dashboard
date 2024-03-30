export const storeObject = (key: string, data: Record<string, any>): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const storeString = (key: string, data: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, data);
  }
};

export const getObectItem = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (!data || data === "undefined") {
      return null;
    }
    return JSON.parse(data);
  }
  return null;
};

export const getStringItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data;
  }
  return null;
};

export const removeItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
