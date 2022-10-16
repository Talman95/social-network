import React, {FC, useEffect} from 'react';
import {Profile} from "./Profile";
import {loadProfilePage, setUserProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../features/hooks/hooks";
import {Preloader} from "../common/Preloader/Preloader";

export const ProfileContainer: FC = () => {
    const authId = useAppSelector(state => state.auth.id)
    const isLoad = useAppSelector(state => state.profile.isLoad)

    const dispatch = useAppDispatch()

    let {userId} = useParams()

    useEffect(() => {
        if (!userId) {
            userId = String(authId)
        }
        dispatch(loadProfilePage(+userId))
    }, [userId])

    useEffect(() => {
        return () => {
            dispatch(setUserProfile(null))
        }
    }, [])

    if (isLoad) {
        return <Preloader/>
    }

    return (
        <Profile userId={userId}/>
    )
}