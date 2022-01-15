import React from 'react';
import cl from './MyButton.module.css';

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
};

export const MyButton = ({children}: PropsType) => {
    return (
        <button className={cl.myBtn}>
            {children}
        </button>
    )
};