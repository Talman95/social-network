import React from 'react';
import cl from './Profile.module.css';
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";

export const Profile: React.FC<any> = (props) => {
    return (
        <div className={cl.profile}>
            <div className={cl.write_post_container}>
                <div className={cl.user_profile}>
                    <img src={user} alt="user"/>
                    <div>
                        <p>Roman Talmanff</p>
                        <span className={cl.status}>Set the status</span>
                    </div>
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