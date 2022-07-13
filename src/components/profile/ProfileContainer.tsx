import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {getProfileStatus, getUserProfile, isFollow} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../features/hooks/hooks";

export const ProfileContainer: FC = () => {
    const authId = useAppSelector(state => state.auth.id)

    const dispatch = useAppDispatch()

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        dispatch(getUserProfile(+userId))
        dispatch(getProfileStatus(+userId))
        dispatch(isFollow(+userId))
    }, [userId])

    return (
        <Profile userId={userId}/>
    )
}