import React from 'react';
import classes from './Messages.module.css';
import userLogo from './../../assets/images/userLogo.png';

const Messages = () => {
    return (
        <div className={classes.chatbox}>
            <div className={classes.header}>
                <img src={userLogo} alt='user' />
                <div className={classes.person}>
                    <span className={classes.name}>Anna Luzhina</span>
                    <span className={classes.status}>Online</span>
                </div>
                <a href="">
                    <img src="" alt=""/>
                </a>
            </div>

            <div className={classes.chat_logs}>
                <div className={classes.chat}>
                    <div className={classes.user_photo}>
                        <img src={userLogo} alt=""/>
                    </div>
                    <p className={classes.chat_message}>
                        something else...
                    </p>
                </div>
            </div>

            <div className={classes.chatForm}>
                <div className={classes.textarea}>
                    <textarea rows={3} placeholder={"Enter your message"}></textarea>
                </div>
                <button>Send</button>
            </div>
        </div>
    );
};

export default Messages;