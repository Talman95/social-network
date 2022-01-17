import React from 'react';
import cl from './Profile.module.css';
import user from '../../assets/images/userLogo.png';
import {MyButton} from "../UI/button/MyButton";
import like from '../../assets/images/like.png';
import comments from '../../assets/images/like.png';

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
            <div className={cl.post_container}>
                <div className={cl.user_profile}>
                    <img src={user} alt="user" />
                    <div>
                        <p>Roman Talman</p>
                        <span>time</span>
                    </div>
                </div>

                <p className={cl.post_text}>Something text</p>

                <div className={cl.post_row}>
                    <div className={cl.activity_icons}>
                        <div><img src={like} alt="like" />5</div>
                        <div><img src={comments} alt="comments" />2</div>
                    </div>
                </div>
            </div>
        </div>
    );
};