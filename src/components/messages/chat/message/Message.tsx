import React from 'react';
import classes from './Message.module.css';
import avatar from '../../../../assets/images/userLogo.png';

type PropsType = {
    name: string
    message: string
    time: string
}

export const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.message}>
            <img src={avatar} alt={'Friend'} className={classes.profile_img}/>
            <div className={classes.message_bubble}>
                <div className={classes.message_body}>
                    <span className={classes.name}>{props.name}</span>
                    <span className={classes.message_send}>{props.message}</span>
                </div>
                <span className={classes.time}>{props.time}</span>
            </div>
        </div>
    );
};