import React from 'react';
import white_search from './../../assets/images/white_search.png';
import classes from './Sidebar.module.css';
import SidebarItem from './sidebarItem/SidebarItem';

type propsType = {
    chats: Array<inArray>
}
type inArray = {
    name: string
    lastMessage: string
    notice: number
    date: string
}

const Sidebar = (props: propsType) => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.search_chat}>
                <div className={classes.search_box}>
                    <div className={classes.search_img}>
                        <img src={white_search} alt={'search'}/>
                    </div>
                    <input type='text' placeholder='Search to start new chat'/>
                </div>
            </div>
            <div className={classes.chats}>
                {props.chats.map(m => {
                    return (
                        <SidebarItem name={m.name} lastMessage={m.lastMessage} notice={m.notice} date={m.date} />
                    )
                })}
            </div>
        </div>
    );
};

export default Sidebar;