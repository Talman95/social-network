import React from 'react';
import white_search from './../../assets/images/white_search.png';
import classes from './Sidebar.module.css';
import SidebarItem from './sidebarItem/SidebarItem';
import userLogo from '../../assets/images/userLogo.png';
import search from "../../assets/images/search.png";

type PropsType = {
    chats: Array<inArray>
}
type inArray = {
    name: string
    lastMessage: string
    notice: number
    time: string
}

const Sidebar: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.profile_info}>
                <img className={classes.profile_img} src={userLogo} alt={'Profile'}/>
                <span>

                </span>
            </div>
            <div className={classes.search_box}>
                <div className={classes.search_button}>
                    <img src={search} alt="search button"/>
                </div>
                <input type="text" placeholder="Search here..." />
            </div>
            <div className={classes.chats}>
                {props.chats.map(m => {
                    return (
                        <SidebarItem name={m.name} lastMessage={m.lastMessage} notice={m.notice} date={m.time}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar;