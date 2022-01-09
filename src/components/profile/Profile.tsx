import React from 'react';
import classes from './Profile.module.css';
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";

export const Profile: React.FC<any> = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.header}>
                <div className={classes.photo}>
                    <img src={user} />
                    <MyButton>Редактировать</MyButton>
                </div>
                <div className={classes.info}>
                    <div className={classes.about}>
                        <span className={classes.name}>Roman Talman</span>
                        <span className={classes.online}>Online</span>
                    </div>
                    <span className={classes.status}>Set the status</span>
                </div>
            </div>
        </div>
    );
};