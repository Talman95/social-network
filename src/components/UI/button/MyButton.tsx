import React from 'react';
import cl from './MyButton.module.css';

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
    callback: () => void
    disabled?: boolean
};

export const MyButton: React.FC<PropsType> = (
    {
        children, callback, disabled
    }
) => {
    const onClickHandler = () => {
        callback();
    }
    return (
        <button
            onClick={() => onClickHandler()}
            className={cl.myBtn}
            disabled={disabled}
        >
            {children}
        </button>
    )
};