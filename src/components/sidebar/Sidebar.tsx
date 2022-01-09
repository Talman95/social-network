import React from 'react';
import classes from './Sidebar.module.css';
import SidebarItem from './sidebarItem/SidebarItem';
import userLogo from '../../assets/images/userLogo.png';
import search from "../../assets/images/search.png";
import {NavLink} from "react-router-dom";
import account from '../../assets/images/test_account.png';
import find_user from '../../assets/images/find_user.png';
import settings from '../../assets/images/settings.png';
import contacts from '../../assets/images/contacts.png';
import {MyInput} from "../UI/input/MyInput";

type PropsType = {
    chats: Array<inArray>
}
type inArray = {
    id: number
    name: string
    lastMessage: string
    notice: number
    time: string
}

const Sidebar: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.profile_info}>
                <NavLink to={'/profile'}>
                    <img className={classes.profile_img} src={account} alt={'Profile'}/>
                </NavLink>
                <div className={classes.menu}>
                    <a href={'/contacts'}><span className={classes.menu_link}><img src={contacts}/></span></a>
                    <a href={'/contacts'}><span className={classes.menu_link}><img src={find_user}/></span></a>
                    <a href={'/contacts'}><span className={classes.menu_link}><img src={settings}/></span></a>
                </div>
            </div>
            <MyInput />
            <div className={classes.chats}>
                {props.chats.map(m => {
                    return (
                        <SidebarItem name={m.name} lastMessage={m.lastMessage} notice={m.notice} date={m.time}
                        id={m.id}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar;