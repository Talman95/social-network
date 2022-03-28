import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {getUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../redux/store";

export const ProfileContainer: FC = () => {

    const dispatch = useDispatch<any>()

    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const authId = useSelector((state: AppStateType) => state.auth.id)

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        dispatch(getUserProfile(userId))
    }, [userId, authId])

    return (
        <Profile profile={profile}/>
    )
}