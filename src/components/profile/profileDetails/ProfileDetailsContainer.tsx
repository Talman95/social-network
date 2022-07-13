import React, {ChangeEvent, FC} from 'react';
import {ProfileDetails} from "./ProfileDetails";
import {useAppDispatch, useAppSelector} from "../../../features/hooks/hooks";
import {follow, unfollow} from "../../../redux/usersReducer";
import {isFollow, uploadUserPhoto} from "../../../redux/profileReducer";

type ProfileDetailsContainerType = {
    userId: string | undefined
}

export const ProfileDetailsContainer: FC<ProfileDetailsContainerType> = (props) => {
    const {profile, status, isFriend} = useAppSelector(state => state.profile)
    // ID from url each user whose page we went to view
    const userId = props.userId

    const dispatch = useAppDispatch()

    const followHandler = async () => {
        if (userId) {
            await dispatch(follow(+userId))
            dispatch(isFollow(+userId))
        }
    }
    const unfollowHandler = async () => {
        if (userId) {
            await dispatch(unfollow(+userId))
            dispatch(isFollow(+userId))
        }
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            dispatch(uploadUserPhoto(newFile))
        }
    }
    return (
        <ProfileDetails
            profile={profile}
            status={status}
            isFriend={isFriend}
            userId={userId}
            follow={followHandler}
            unfollow={unfollowHandler}
            photoSelected={onMainPhotoSelected}
        />
    )
}