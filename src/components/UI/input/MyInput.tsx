import React from 'react';
import cl from "./MyInput.module.css";
import search from "../../../assets/images/search.png";

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
};

export const MyInput = ({children}: PropsType) => {
    return (
        <div className={cl.myInput}>
            <input type="text" placeholder="Search">{children}</input>
        </div>
    );
};