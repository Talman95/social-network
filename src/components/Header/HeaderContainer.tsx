import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logoutUser } from '../../store/middlewares/auth/actions';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { Header } from './Header';

export const HeaderContainer = (): ReturnComponentType => {
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navigateToProfile = () => navigate('/profile');
  const navigateToUsers = () => navigate('/users');
  const navigateToMessages = () => navigate('/messages');

  const logoutHandler = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  return (
    <Header
      isAuth={isAuth}
      currentUser={currentUser}
      logout={logoutHandler}
      navigateToProfile={navigateToProfile}
      navigateToUsers={navigateToUsers}
      navigateToMessages={navigateToMessages}
    />
  );
};
