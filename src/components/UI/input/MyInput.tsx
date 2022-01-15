import React from 'react';
import cl from "./MyInput.module.css";
import search from "../../../assets/images/search.png";

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
};

export const MyInput = ({children}: PropsType) => {
    return (
        <div className={cl.search_box}>
            <div className={cl.search_button}>
                <img src={search} alt="search button"/>
            </div>
            <input type="text" placeholder="Search here...">{children}</input>
        </div>
    );
};