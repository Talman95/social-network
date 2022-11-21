import React, { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadProfilePage, setUserProfile } from '../../store/profileReducer';
import { Preloader } from '../common/Preloader/Preloader';

import { Profile } from './Profile';

export const ProfileContainer: FC = () => {
  const authId = useAppSelector(state => state.auth.id);
  const isLoad = useAppSelector(state => state.profile.isLoad);

  const dispatch = useAppDispatch();

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

  if (isLoad) {
    return <Preloader />;
  }

  return <Profile userId={userId} />;
};
