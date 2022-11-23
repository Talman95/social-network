import React, { ChangeEvent, FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { uploadUserPhoto } from '../../../store/middlewares/profile/actions';
import { followUser, unfollowUser } from '../../../store/middlewares/users/actions';

import { ProfileDetails } from './ProfileDetails';

type ProfileDetailsContainerType = {
  userId: string | undefined;
};

export const ProfileDetailsContainer: FC<ProfileDetailsContainerType> = ({ userId }) => {
  const { profile, status, isFriend } = useAppSelector(state => state.profile);

  const dispatch = useAppDispatch();

  const followHandler = () => {
    if (userId) {
      dispatch(followUser(+userId, 'profile'));
    }
  };

  const unfollowHandler = () => {
    if (userId) {
      dispatch(unfollowUser(+userId, 'profile'));
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
