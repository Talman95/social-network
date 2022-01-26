import React from 'react';
import cl from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfilePageType} from "../../redux/state";
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";

type PropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updatePostMessage: (postMessage: string) => void
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.profile_container}>
            <ProfileDetails/>
            <MyPosts posts={props.profilePage.posts}
                     addPost={props.addPost}
                     postMessage={props.profilePage.postMessage}
                     updatePostMessage={props.updatePostMessage}
            />
        </div>
    );
};