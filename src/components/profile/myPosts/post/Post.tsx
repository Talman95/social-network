import React from 'react';
import cl from "./Post.module.css";
import user from "../../../../assets/images/userLogo.png";
import like from "../../../../assets/images/like.png";
import comments from "../../../../assets/images/like.png";

type PropsType = {
    id: number
    message: string
    likesCount: number
}

export const Post:React.FC<PropsType> = (props) => {
    return (
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
    );
};