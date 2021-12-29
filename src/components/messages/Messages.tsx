import React from 'react';
import classes from './Messages.module.css';
import userLogo from './../../assets/images/userLogo.png';
import smile from './../../assets/images/smile.png';

type MessagesPropsType = {
    name: string,
    status: string
}

const Messages = (props: MessagesPropsType) => {
    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.header_left}>
                    <img src={userLogo} alt ='user'/>
                    <div className={classes.chat_name}>
                        <span className={classes.contact_name}>{props.name}</span>
                        <span className={classes.contact_status}>{props.status}</span>
                    </div>
                </div>
                <div className={classes.header_right}>

                </div>
            </div>
            <div className={classes.chat_window}>
                <div className={classes.sender}>
                    <span className={classes.sender_message}>Hey! How are you? dfngkdflgfkdglkdfjglkdfjgkljdfklgjkldfgjdflk gfhhfhgfh gfhgfhfgh fghfhfhfh fghf</span>
                    <span className={classes.message_time}>14:21</span>
                </div>
                <div className={classes.receiver}>
                    <span className={classes.receiver_message}>I'm fine! Thank you. dfngkdflgfkdglkdfjglkdfjgkljdfklgjkldfgjdflk gfhhfhgfh gfhgfhfgh fghfhfhfh fghf</span>
                    <span className={classes.message_time}>14:24</span>
                </div>
            </div>
            <div className={classes.message_bar}>
                <div className={classes.bar_left}>
                    <img src={smile} alt={'smile'}/>
                </div>
                <div className={classes.bar_center}>
                    <input type='text' placeholder='Type a message' />
                </div>
            </div>
        </div>
    );
};

export default Messages;