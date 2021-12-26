import React from 'react';
import userLogo from './../../assets/images/userLogo.png';
import chat from './../../assets/images/chat.png';
import config from './../../assets/images/config.png';
import search from './../../assets/images/search.png';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebar_header}>
                <div className={classes.user_info}>
                    <img src={userLogo} alt={'user photo'}/>
                    <div className={classes.user_name}>
                        <p>Name Full</p>
                        <small>status</small>
                    </div>
                </div>

                <div className={classes.sidebar_header_icons}>
                    <img src={chat} alt={chat}/>
                    <img src={config} alt={'configuration'}/>
                </div>
            </div>
            <div className={classes.search_chat}>
                <div className={classes.search_bar}>
                    <img src={search} alt={'search'}/>
                    <input type='text' placeholder='Search to start new chat'/>
                </div>
            </div>
            <div className={classes.chats}>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <img src={userLogo} alt={'user photo'}/>
                    </div>
                    <div className={classes.chat_right}>
                        <div className={classes.chat_right_top}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.chat_date}>12:54</span>
                        </div>
                        <div className={classes.chat_right_bottom}>

                        </div>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <img src={userLogo}/>
                    </div>
                    <div className={classes.chat_right}>
                        <div className={classes.chat_right_top}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.chat_date}>12:54</span>
                        </div>
                        <div className={classes.chat_right_bottom}>

                        </div>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <img src={userLogo}/>
                    </div>
                    <div className={classes.chat_right}>
                        <div className={classes.chat_right_top}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.chat_date}>12:54</span>
                        </div>
                        <div className={classes.chat_right_bottom}>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;