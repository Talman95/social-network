import React, { ChangeEvent, MouseEvent, useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentPage } from '../../store/actions/usersActions';
import {
  followUser,
  getUsers,
  unfollowUser,
} from '../../store/middlewares/users/actions';
import { ReturnComponentType } from '../../types/ReturnComponentType';

import { Users } from './Users';

export const UsersContainer = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users.users);
  const currentPage = useAppSelector(state => state.users.currentPage);
  const pageSize = useAppSelector(state => state.users.pageSize);
  const totalCount = useAppSelector(state => state.users.totalCount);
  const isFetching = useAppSelector(state => state.users.isFetching);
  const pressingInProgress = useAppSelector(state => state.users.pressingInProgress);
  const searchName = useAppSelector(state => state.users.filter.searchName);
  const userFriends = useAppSelector(state => state.users.filter.userFriends);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, currentPage, pageSize, searchName, userFriends]);

  const changePage = (event: ChangeEvent<unknown>, pageNumber: number): void => {
    dispatch(setCurrentPage(pageNumber));
  };
  const followHandler = (e: MouseEvent<HTMLButtonElement>, userID: number): void => {
    e.preventDefault();
    dispatch(followUser(userID, 'users'));
  };
  const unfollowHandler = (e: MouseEvent<HTMLButtonElement>, userID: number): void => {
    e.preventDefault();
    dispatch(unfollowUser(userID, 'users'));
  };

  return (
    <Users
      users={users}
      follow={followHandler}
      unfollow={unfollowHandler}
      currentPage={currentPage}
      pageSize={pageSize}
      totalCount={totalCount}
      switchPage={changePage}
      isFetching={isFetching}
      pressingInProgress={pressingInProgress}
    />
  );
};
