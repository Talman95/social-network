import React from 'react';
import cl from './Profile.module.css';
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";
import {ReduxStoreType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type PropsType = {
    store: ReduxStoreType
}

export const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.profile_container}>
            <ProfileDetails/>
            <MyPostsContainer store={props.store}/>
        </div>
    );
};