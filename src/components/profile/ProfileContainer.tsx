import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {getProfileStatus, getUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {Dispatch} from 'redux';

export const ProfileContainer: FC = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const authId = useSelector((state: AppStateType) => state.auth.id)
    const status = useSelector<AppStateType, string>(state => state.profile.profileStatus)

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        dispatch(getUserProfile(+userId))
        dispatch(getProfileStatus(+userId))
    }, [userId, authId])

    return (
        <Profile profile={profile} status={status}/>
    )
}