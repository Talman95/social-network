import React from 'react';
import classes from './SidebarItem.module.css';
import userLogo from '../../../assets/images/userLogo.png';

type PropsType = {
    name: string,
    lastMessage: string,
    notice: number,
    date: string
}

const SidebarItem: React.FC<PropsType> = (props) => {
    return (
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
    );
};

export default SidebarItem;