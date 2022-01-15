import React from 'react';
import cl from "./ChatHeader.module.css";
import userLogo from "../../../../assets/images/userLogo.png";
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string,
    status: string
}
export const ChatHeader = (props: PropsType) => {
    return (
        <div className={cl.header}>
            <NavLink to={'/profile'}>
                <div className={cl.header_left}>
                    <img src={userLogo} alt='user'/>
                    <div className={cl.chat_name}>
                        <span className={cl.contact_name}>{props.name}</span>
                        <span className={cl.contact_status}>{props.status}</span>
                    </div>
                </div>
            </NavLink>
            <div className={cl.header_right}>

            </div>
        </div>
    );
};