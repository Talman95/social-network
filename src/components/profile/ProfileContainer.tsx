import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {getProfileStatus, getUserProfile, isFollow} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {Dispatch} from 'redux';
import {ProfileType} from "../../api/api";

export const ProfileContainer: FC = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const profile = useSelector<AppStateType, ProfileType | null>(state=> state.profile.profile)
    const authId = useSelector<AppStateType, number | null>(state => state.auth.id)
    const status = useSelector<AppStateType, string>(state => state.profile.profileStatus)
    const isFriend = useSelector<AppStateType, boolean>(state => state.profile.isFriend)

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        dispatch(getUserProfile(+userId))
        dispatch(getProfileStatus(+userId))
        dispatch(isFollow(+userId))
    }, [userId, authId])

    return (
        <Profile profile={profile} status={status} isFriend={isFriend}/>
    )
}