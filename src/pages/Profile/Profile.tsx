import React, { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { ProfileSkeleton } from '../../components/common/ProfileSkeleton/ProfileSkeleton';
import { appStatus } from '../../enums/appStatus';
import { path } from '../../enums/path';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUserProfile } from '../../store/actions/profileActions';
import { loadProfilePage } from '../../store/middlewares/profile';
import { selectAppStatus } from '../../store/selectors/appSelectors';
import { selectAuthId } from '../../store/selectors/authSelectors';

import { MyPosts } from './MyPosts/MyPosts';
import { ProfileDetails } from './ProfileDetails/ProfileDetails';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();

  const authId = useSelector(selectAuthId);
  const status = useSelector(selectAppStatus);

  let { userId } = useParams();

  useEffect(() => {
    if (userId && authId) {
      if (Number(userId) === authId) {
        return;
      }
    }

    if (!userId) {
      userId = String(authId);
    }

    dispatch(loadProfilePage(+userId));
  }, [userId]);

  useEffect(
    () => () => {
      dispatch(setUserProfile(null));
    },
    [],
  );

  if (status !== appStatus.IDLE) {
    return <ProfileSkeleton />;
  }

  if (userId && authId) {
    if (Number(userId) === authId) {
      return <Navigate to={path.PROFILE} />;
    }
  }

  return (
    <>
      <ProfileDetails userId={userId} />
      {!userId && <MyPosts />}
    </>
  );
};
