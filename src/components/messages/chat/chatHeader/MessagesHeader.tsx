import React from 'react';
import classes from "./MessagesHeader.module.css";
import userLogo from "../../../../assets/images/userLogo.png";
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string,
    status: string
}
export const MessagesHeader = (props: PropsType) => {
    return (
        <div className={classes.header}>
            <NavLink to={'/profile'}>
                <div className={classes.header_left}>
                    <img src={userLogo} alt='user'/>
                    <div className={classes.chat_name}>
                        <span className={classes.contact_name}>{props.name}</span>
                        <span className={classes.contact_status}>{props.status}</span>
                    </div>
                </div>
            </NavLink>
            <div className={classes.header_right}>

            </div>
        </div>
    );
};