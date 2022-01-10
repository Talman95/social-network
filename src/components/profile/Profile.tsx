import React from 'react';
import classes from './Profile.module.css';
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";

export const Profile: React.FC<any> = (props) => {
    return (
        <div className={classes.profile}>
            <div className={classes.header}>
                <div className={classes.photo}>
                    <img src={user}/>
                    <MyButton>Edit</MyButton>
                    <div className={classes.job}>
                        <input type={'checkbox'} checked={true}/> <span>Ищу работу</span>
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.about}>
                        <span className={classes.name}>Roman Talman</span>
                        <span className={classes.online}>Online</span>
                    </div>
                    <span className={classes.status}>Set the status</span>
                </div>
            </div>

            <div className={classes.write_post_container}>
                <div className={classes.user_profile}>
                    <img src={user} alt=""/>
                </div>
                <div className={classes.post_input_container}>
                    <textarea rows={3} placeholder={"How you doin?"}></textarea>
                    <div className={classes.add_post_button}>
                        <MyButton>Add a post</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};