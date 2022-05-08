import React, {FC} from 'react';
import cl from './Profile.module.css';
import {ProfileDetails} from "./ProfileDetails/ProfileDetails";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../api/api";
import Box from "@mui/material/Box";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
}

export const Profile: FC<ProfilePropsType> = (props) => {
    return (
        <>
            {/*<ProfileDetails profile={props.profile} status={props.status}/>*/}
            <MyPostsContainer/>
        </>
    );
};