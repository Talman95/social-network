import React from 'react';
import classes from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import userLogo from '../../../../assets/images/userLogo.png';

type PropsType = {
    id: number
    name: string,
    lastMessage: string,
    notice: number,
    date: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <>
            <NavLink to={`/messages/${props.id}`}>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>{props.name}</span>
                            <span className={classes.contact_mes}>{props.lastMessage}</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>{props.date}</span>
                        <span className={classes.chat_notice}>{props.notice}</span>
                    </div>
                </div>
            </NavLink>

        </>
    );
};

export default DialogItem;