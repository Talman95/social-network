import React from 'react';
import classes from './MyButton.module.css';

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
};

export const MyButton = ({children}: PropsType) => {
    return (
        <button className={classes.myBtn}>
            {children}
        </button>
    )
};