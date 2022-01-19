import React from 'react';
import cl from './Profile.module.css';
import {MyPosts} from "./myPosts/MyPosts";
import {PostType} from "../../redux/state";
import {ProfileInfo} from "./profileInfo/ProfileInfo";

type PropsType = {
    posts: PostType[]
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.profile}>
            <ProfileInfo />
            <MyPosts posts={props.posts}/>
        </div>
    );
};