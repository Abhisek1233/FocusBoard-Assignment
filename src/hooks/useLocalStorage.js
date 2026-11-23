import { useState, useEffect } from 'react';

/**
 * Custom hook to safely persist state in browser localStorage.
 * Handles JSON serialization, errors, and prevents initial sample data
 * from overwriting user-saved state across browser refreshes.
 *
 * @param {string} key - localStorage storage key
 * @param {any} initialValue - Fallback value if nothing exists in storage
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
      // If no data exists, write initialValue to localStorage so subsequent checks find it
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
