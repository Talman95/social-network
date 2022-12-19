import { useEffect, useState } from 'react';

const DELAY = 500;

export const useDebounce = <T>(value: T, delay: number = DELAY): T => {
  const [message, setMessage] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMessage(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return message;
};
