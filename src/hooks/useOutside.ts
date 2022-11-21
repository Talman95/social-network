import { useEffect, useRef, useState } from 'react';

export const useOutside = (initialIsVisible: boolean) => {
  const [isShow, setIsShow] = useState(initialIsVisible);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any): void => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    };
  }, []);

  return { ref, isShow, setIsShow };
};
