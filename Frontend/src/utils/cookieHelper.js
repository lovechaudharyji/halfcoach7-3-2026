import Cookies from "js-cookie";

export const setData = (key, value) => {
  try {
    // Store in first-party cookies
    Cookies.set(key, JSON.stringify(value), { expires: 7, secure: true, sameSite: "Strict" });

    // Also store in localStorage as a backup
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting data:", error);
  }
};

export const getData = (key) => {
  try {
    // Try getting from cookies first
    const cookieData = Cookies.get(key);
    if (cookieData) return JSON.parse(cookieData);

    // Fallback to localStorage
    const localStorageData = localStorage.getItem(key);
    return localStorageData ? JSON.parse(localStorageData) : null;
  } catch (error) {
    console.error("Error getting data:", error);
    return null;
  }
};

export const removeData = (key) => {
  try {
    Cookies.remove(key);
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data:", error);
  }
};
