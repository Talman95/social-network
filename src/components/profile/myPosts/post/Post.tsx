import React from 'react';
import cl from "./Post.module.css";
import user from "../../../../assets/images/userLogo.png";
import like from "../../../../assets/images/like.png";
import comments from "../../../../assets/images/comments.png";
import {MyButton} from "../../../UI/button/MyButton";
import {ActionTypes} from "../../../../redux/state";
import {deletePostAC} from "../../../../redux/profileReducer";

type PropsType = {
    id: number
    message: string
    likesCount: number
    dispatch: (action: ActionTypes) => void
}

export const Post: React.FC<PropsType> = ({id, message, likesCount, ...restProps}) => {
    const onDeletePostHandler = (postId: number) => {
        restProps.dispatch(deletePostAC(postId));
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
                    <MyButton callback={() => onDeletePostHandler(id)}>X</MyButton>
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