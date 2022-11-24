import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Preloader } from '../../components/common/Preloader/Preloader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setUserProfile } from '../../store/actions/profileActions';
import { getProfilePage } from '../../store/middlewares/profile/actions';
import { selectAuthId } from '../../store/selectors/authSelectors';
import { selectProfileIsFetching } from '../../store/selectors/profileSelectors';

import { MyPosts } from './MyPosts/MyPosts';
import { ProfileDetails } from './ProfileDetails/ProfileDetails';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const authId = useSelector(selectAuthId);
  const isFetching = useSelector(selectProfileIsFetching);

  let { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      userId = String(authId);
    }
    dispatch(getProfilePage(+userId));
  }, [userId]);

  useEffect(
    () => () => {
      dispatch(setUserProfile(null));
    },
    [],
  );

  if (isFetching) {
    return <Preloader />;
  }

  return (
    <>
      <ProfileDetails userId={userId} />
      {!userId && <MyPosts />}
    </>
  );
};
