import React, {FC} from 'react';
import {MyPostsContainer} from "./MyPosts1/MyPostsContainer";
import {ProfileDetailsContainer} from "./ProfileDetails1/ProfileDetailsContainer";

type ProfilePropsType = {
    userId: string | undefined
}

export const Profile: FC<ProfilePropsType> = (props) => {
    return (
        <>
            <ProfileDetailsContainer userId={props.userId}/>
            {!props.userId && <MyPostsContainer/>}
        </>
    );
};