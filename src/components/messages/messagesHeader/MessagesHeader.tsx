import React from 'react';
import classes from "./MessagesHeader.module.css";
import userLogo from "../../../assets/images/userLogo.png";

type PropsType = {
    name: string,
    status: string
}
const MessagesHeader = (props: PropsType) => {
    return (
        <div className={classes.header}>
            <div className={classes.header_left}>
                <img src={userLogo} alt ='user'/>
                <div className={classes.chat_name}>
                    <span className={classes.contact_name}>{props.name}</span>
                    <span className={classes.contact_status}>{props.status}</span>
                </div>
            </div>
            <div className={classes.header_right}>

            </div>
        </div>
    );
};

export default MessagesHeader;