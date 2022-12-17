import { useEffect, useState } from 'react';

const DELAY = 500;

export const useDebounce = <T>(value: T, delay: number = DELAY) => {
  const [message, setMessage] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMessage(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return message;
};
