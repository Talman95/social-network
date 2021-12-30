import React from 'react';
import white_search from './../../assets/images/white_search.png';
import classes from './Sidebar.module.css';
import SidebarItem from './sidebarItem/SidebarItem';


const Sidebar = (props: any) => {
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
                <SidebarItem name={'Dmitrii Antonov'} lastMessage={'Hey. Do you have any props?'} notice={1} date={'12:33'}/>
                <SidebarItem name={'Artyom Vasiliev'} lastMessage={'Let\'s get it started!'} notice={11} date={'00:19'}/>
                <SidebarItem name={'Dariya Bugaeva'} lastMessage={'Merry Christmas'} notice={2} date={'23:07'}/>
            </div>
        </div>
    );
};

export default Sidebar;