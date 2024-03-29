export const setItem = (key: string, data: any) => {
  if (typeof data === "string") {
    localStorage.setItem(key, data);
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getItem = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data || data === "undefined") {
    return null;
  }
  return JSON.parse(data);
};

export const getStringItem = (key: string) => {
  const data = localStorage.getItem(key);
  return data;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
