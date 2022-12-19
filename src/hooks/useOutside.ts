import { RefObject, useEffect, useRef, useState } from 'react';

type ReturnType = {
  ref: RefObject<HTMLDivElement>;
  isShow: boolean;
  setIsShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
};

export const useOutside = (initialIsVisible: boolean): ReturnType => {
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
