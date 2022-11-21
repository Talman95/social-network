import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getFriends } from '../../store/middlewares/users/sagas';
import { AppStateType } from '../../store/store';
import { ReturnComponentType } from '../../types/ReturnComponentType';
import { UserType } from '../../types/UserType';

import { Sidebar } from './Sidebar';

export const SidebarContainer = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const followings = useSelector<AppStateType, UserType[]>(
    state => state.users.followings,
  );
  const followingsCount = useSelector<AppStateType, number>(
    state => state.users.followingsCount,
  );
  const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth);

  useEffect(() => {
    dispatch(getFriends());
  }, [isAuth]);

  return (
    <Sidebar followings={followings} followingsCount={followingsCount} isAuth={isAuth} />
  );
};
