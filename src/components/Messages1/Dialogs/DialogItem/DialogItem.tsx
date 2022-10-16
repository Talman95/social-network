import React from 'react';
import cl from './DialogItem.module.css';
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
                <div className={cl.chat}>
                    <div className={cl.chat_left}>
                        <div className={cl.chat_img}>
                            <img src={userLogo} alt={'user'}/>
                        </div>
                        <div className={cl.contact_info}>
                            <span className={cl.contact_name}>{props.name}</span>
                            <span className={cl.contact_mes}>{props.lastMessage}</span>
                        </div>
                    </div>
                    <div className={cl.chat_right}>
                        <span className={cl.chat_date}>{props.date}</span>
                        <span className={cl.chat_notice}>{props.notice}</span>
                    </div>
                </div>
            </NavLink>

        </>
    );
};

export default DialogItem;