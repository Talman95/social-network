import React, {ChangeEvent, FC} from 'react';
import {ProfileDetails} from "./ProfileDetails";
import {useAppDispatch, useAppSelector} from "../../../features/hooks/hooks";
import {followFromFrofile, unfollowFromFrofile, uploadUserPhoto} from "../../../redux/profileReducer";

type ProfileDetailsContainerType = {
    userId: string | undefined
}

export const ProfileDetailsContainer: FC<ProfileDetailsContainerType> = (props) => {
    const {profile, status, isFriend} = useAppSelector(state => state.profile)
    // ID from url each user whose page we went to view
    const userId = props.userId

    const dispatch = useAppDispatch()

    const followHandler = () => {
        if (userId) {
            dispatch(followFromFrofile(+userId))
        }
    }

    const unfollowHandler = () => {
        if (userId) {
            dispatch(unfollowFromFrofile(+userId))
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