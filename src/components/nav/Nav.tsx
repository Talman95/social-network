import React from 'react';
import cl from './Nav.module.css';
import {NavLink} from "react-router-dom";

export const Nav: React.FC<any> = (props) => {
    return (
        <div className={cl.nav}>
            <div className={cl.links}>
                <NavLink to={"/profile"} className={cl.item}>Profile</NavLink>
                <NavLink to={"/messages"} className={cl.item}>Messages</NavLink>
                <NavLink to={"/users"} className={cl.item}>Users</NavLink>
                <NavLink to={'/settings'} className={cl.item}>Settings</NavLink>
            </div>

        </div>
    );
};