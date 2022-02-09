import React from 'react';
import cl from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ActionTypes, } from "../../redux/state";
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";
import {ProfileState} from "../../redux/profileReducer";

type PropsType = {
    profilePage: ProfileState
    dispatch: (action: ActionTypes) => void
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