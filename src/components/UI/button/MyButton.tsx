import React from 'react';
import cl from './MyButton.module.css';

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
    callback: () => void
};

export const MyButton: React.FC<PropsType> = ({children, callback}) => {
    const onClickHandler = () => {
        callback();
    }
    return (
        <button onClick={() => onClickHandler()} className={cl.myBtn}>
            {children}
        </button>
    )
};