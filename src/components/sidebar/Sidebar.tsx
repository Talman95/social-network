import React from 'react';
import classes from './Sidebar.module.css';
import {NavLink} from "react-router-dom";
import user from '../../assets/images/userLogo.png';


export const Sidebar: React.FC<any> = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar_tittle}>
                <h4>Following</h4>
                <NavLink to="/">
                    Hide Chat
                </NavLink>
            </div>

            <div className={classes.online_list}>
                <div className={classes.online}>
                    <img src={user} alt="User logo" />
                </div>
                <p>Full Name</p>
            </div>
        </div>
    );
};