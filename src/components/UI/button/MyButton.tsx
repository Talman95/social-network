import React from 'react';

import cl from './MyButton.module.css';

type PropsType = {
  callback: () => void;
  children: React.ReactChild | React.ReactChild[];
  disabled: boolean;
};

export const MyButton: React.FC<PropsType> = ({ children, callback, disabled }) => {
  const onClickHandler = (): void => {
    callback();
  };

  return (
    <button
      type="button"
      onClick={() => onClickHandler()}
      className={cl.myBtn}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
