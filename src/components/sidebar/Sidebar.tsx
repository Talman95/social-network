import React from 'react';
import userLogo from './../../assets/images/userLogo.png';
import chat from './../../assets/images/chat.png';
import config from './../../assets/images/config.png';
import search from './../../assets/images/search.png';
import classes from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.search_chat}>
                <div className={classes.search_box}>
                    <img src={search} alt={'search'}/>
                    <input type='text' placeholder='Search to start new chat'/>
                </div>
            </div>
            <div className={classes.chats}>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user photo'}/>
                        </div>
                        <div className={classes.contact_info}>
                            <span className={classes.contact_name}>Alice</span>
                            <span className={classes.contact_mes}>Hello! How are you?</span>
                        </div>
                    </div>
                    <div className={classes.chat_right}>
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>2</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;