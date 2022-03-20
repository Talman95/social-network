import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {ProfileActionTypes, setUserProfile} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {profileAPI} from "../../api/api";
import {useParams} from "react-router-dom";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/store";

export const ProfileContainer: FC = () => {

    const dispatch = useDispatch<Dispatch<ProfileActionTypes>>()

    const profile = useSelector((state: AppStateType) => state.profile.profile)
    const authId = useSelector((state: AppStateType) => state.auth.id)

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        profileAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }, [dispatch, userId])

    return (
        <Profile profile={profile}/>
    )
}