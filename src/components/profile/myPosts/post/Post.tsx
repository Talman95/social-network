import React from 'react';
import cl from "./Post.module.css";
import user from "../../../../assets/images/userLogo.png";
import like from "../../../../assets/images/like.png";
import comments from "../../../../assets/images/comments.png";
import {MyButton} from "../../../UI/button/MyButton";

type PropsType = {
    id: number
    message: string
    likesCount: number
    deletePost: (postID: number) => void
}

export const Post: React.FC<PropsType> = (
    {
        id, message, likesCount, deletePost
    }
) => {
    const onDeletePost = (postID: number) => {
        deletePost(postID);
    }

    return (
        <div className={cl.post_container}>
            <div className={cl.user_header}>
                <div className={cl.user_profile}>
                    <img src={user} alt="user"/>
                    <div>
                        <p>Roman Talman</p>
                        <span>time</span>
                    </div>
                </div>
                <div className={cl.delete_btn}>
                    <MyButton callback={() => onDeletePost(id)}>X</MyButton>
                </div>
            </div>

            <p className={cl.post_text}>{message}</p>

            <div className={cl.post_row}>
                <div className={cl.activity_icons}>
                    <div><img src={like} alt="like"/>{likesCount}</div>
                    <div><img src={comments} alt="comments"/>0</div>
                </div>
            </div>
        </div>
    );
};