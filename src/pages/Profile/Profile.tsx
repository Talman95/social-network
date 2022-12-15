import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ProfileSkeleton } from '../../components/common/ProfileSkeleton/ProfileSkeleton';
import { appStatus } from '../../enums/appStatus';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUserProfile } from '../../store/actions/profileActions';
import { loadProfilePage } from '../../store/middlewares/profile';
import { selectAppStatus } from '../../store/selectors/appSelectors';
import { selectAuthId } from '../../store/selectors/authSelectors';

import { MyPosts } from './MyPosts/MyPosts';
import { ProfileDetails } from './ProfileDetails/ProfileDetails';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const authId = useSelector(selectAuthId);
  const status = useSelector(selectAppStatus);

  let { userId } = useParams();

  useEffect(() => {
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

  return (
    <>
      <ProfileDetails userId={userId} />
      {!userId && <MyPosts />}
    </>
  );
};
