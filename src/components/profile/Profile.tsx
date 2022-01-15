import React from 'react';
import cl from './Profile.module.css';
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";

export const Profile: React.FC<any> = (props) => {
    return (
        <div className={cl.profile}>
            <div className={cl.header}>
                <div className={cl.photo}>
                    <img src={user} alt={'User'}/>
                    <MyButton>Edit</MyButton>
                    <div className={cl.job}>
                        <input type={'checkbox'} checked={true}/> <span>Ищу работу</span>
                    </div>
                </div>
                <div className={cl.info}>
                    <div className={cl.about}>
                        <span className={cl.name}>Roman Talman</span>
                        <span className={cl.online}>Online</span>
                    </div>
                    <span className={cl.status}>Set the status</span>
                </div>
            </div>

            <div className={cl.write_post_container}>
                <div className={cl.user_profile}>
                    <img src={user} alt=""/>
                </div>
                <div className={cl.post_input_container}>
                    <textarea rows={3} placeholder={"How you doin?"}></textarea>
                    <div className={cl.add_post_button}>
                        <MyButton>Add a post</MyButton>
                    </div>
                </div>
            </div>
        </div>
    );
};