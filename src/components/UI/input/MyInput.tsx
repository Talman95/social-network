import React from 'react';
import classes from "./MyInput.module.css";
import search from "../../../assets/images/search.png";

type PropsType = {
    children?: React.ReactChild | React.ReactChild[];
};

export const MyInput = ({children}: PropsType) => {
    return (
        <div className={classes.search_box}>
            <div className={classes.search_button}>
                <img src={search} alt="search button"/>
            </div>
            <input type="text" placeholder="Search here...">{children}</input>
        </div>
    );
};