import React, {FC} from 'react';
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../api/api";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    isFriend: boolean
}

export const Profile: FC<ProfilePropsType> = (props) => {
    return (
        <>
            <ProfileDetails profile={props.profile} status={props.status} isFriend={props.isFriend}/>
            <MyPostsContainer/>
        </>
    );
};