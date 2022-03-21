import React, {FC} from 'react';
import cl from "./Post.module.css";
import user from "../../../../assets/images/userLogo.png";
import like from "../../../../assets/images/like.png";
import comments from "../../../../assets/images/comments.png";
import {MyButton} from "../../../UI/button/MyButton";
import {ProfileType} from "../../../../redux/profileReducer";
import {Preloader} from "../../../common/Preloader/Preloader";

type PropsType = {
    id: number
    message: string
    likesCount: number
    deletePost: (postID: number) => void
    profile: ProfileType | null
}

export const Post: FC<PropsType> = (
    {
        id, message, likesCount, deletePost, profile
    }
) => {

    const onDeletePost = (postID: number) => {
        deletePost(postID);
    }

    if (!profile) {
        return <Preloader />
    }

    return (
        <div className={cl.post_container}>
            <div className={cl.user_header}>
                <div className={cl.user_profile}>
                    <img src={profile.photos.small ? profile.photos.small : user} alt="user"/>
                    <div>
                        <p>{profile.fullName}</p>
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