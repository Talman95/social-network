import React from 'react';
import cl from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfilePageType} from "../../redux/state";
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";

type PropsType = {
    profilePage: ProfilePageType
    dispatch: any
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.profile_container}>
            <ProfileDetails/>
            <MyPosts posts={props.profilePage.posts}
                     dispatch={props.dispatch}
                     postMessage={props.profilePage.postMessage}
            />
        </div>
    );
};