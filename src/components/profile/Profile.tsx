import React from 'react';
import cl from './Profile.module.css';
import {MyPosts} from "./myPosts/MyPosts";
import {PostType} from "../../redux/state";
import {ProfileDetails} from "./profileDetails/ProfileDetails";

type PropsType = {
    posts: PostType[]
    addPost: (message: string) => void
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.profile_container}>
            <ProfileDetails/>
            <MyPosts posts={props.posts}
                     addPost={props.addPost}
            />
        </div>
    );
};