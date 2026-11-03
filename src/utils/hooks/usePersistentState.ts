import { useEffect, useState } from 'react';

/** useState backed by localStorage; silently falls back to memory when storage is unavailable. */
const usePersistentState = <T,>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: keep in memory only */
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export default usePersistentState;
