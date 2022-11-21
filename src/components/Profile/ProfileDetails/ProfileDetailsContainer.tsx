import React, { ChangeEvent, FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  followFromProfile,
  unfollowFromProfile,
  uploadUserPhoto,
} from '../../../store/profileReducer';

import { ProfileDetails } from './ProfileDetails';

type ProfileDetailsContainerType = {
  userId: string | undefined;
};

export const ProfileDetailsContainer: FC<ProfileDetailsContainerType> = ({ userId }) => {
  const { profile, status, isFriend } = useAppSelector(state => state.profile);

  const dispatch = useAppDispatch();

  const followHandler = () => {
    if (userId) {
      dispatch(followFromProfile(+userId));
    }
  };

  const unfollowHandler = () => {
    if (userId) {
      dispatch(unfollowFromProfile(+userId));
    }
  };
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const firstElement = 0;
    const newFile = e.target.files && e.target.files[firstElement];

    if (newFile) {
      dispatch(uploadUserPhoto(newFile));
    }
  };

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
  );
};
