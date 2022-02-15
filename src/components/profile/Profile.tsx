import React, {FC} from 'react';
import cl from './Profile.module.css';
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";


export const Profile: FC = (props) => {
    return (
        <div className={cl.profile_container}>
            <ProfileDetails/>
            <MyPostsContainer/>
        </div>
    );
};