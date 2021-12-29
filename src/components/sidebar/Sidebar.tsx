import React from 'react';
import userLogo from './../../assets/images/userLogo.png';
import white_search from './../../assets/images/white_search.png';
import classes from './Sidebar.module.css';

type SidebarPropsType = {
    name: string,
    lastMessage: string,
    notice: number
}

const Sidebar = (props: SidebarPropsType) => {
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
                        <span className={classes.chat_date}>12:54</span>
                        <span className={classes.chat_notice}>{props.notice}</span>
                    </div>
                </div>
                <div className={classes.chat}>
                    <div className={classes.chat_left}>
                        <div className={classes.chat_img}>
                            <img src={userLogo} alt={'user'}/>
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
                            <img src={userLogo} alt={'user'}/>
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
                            <img src={userLogo} alt={'user'}/>
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
                            <img src={userLogo} alt={'user'}/>
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
                            <img src={userLogo} alt={'user'}/>
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