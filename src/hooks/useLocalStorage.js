import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [val, setVal] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStored = (newValue) => {
    try {
      // Support functional updates: (prev) => ...
      const valueToStore =
        typeof newValue === 'function' ? newValue(val) : newValue;

      setVal(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.error('localStorage set error', err);
    }
  };

  return [val, setStored];
}
