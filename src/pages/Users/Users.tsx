import React, { FC, useEffect } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { UsersSkeleton } from '../../components/common/UsersSkeleton/UsersSkeleton';
import { appStatus } from '../../enums/appStatus';
import { showUsers } from '../../enums/showUsers';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  resetUsersData,
  setCurrentPage,
  setUsersFilter,
} from '../../store/actions/usersActions';
import { getUsers } from '../../store/middlewares/users';
import { selectAppStatus } from '../../store/selectors/appSelectors';
import {
  selectCurrentPage,
  selectSearchName,
  selectUserFriends,
} from '../../store/selectors/usersSelectors';
import { convertParam } from '../../utils/convertParam';

import { MappedUsers } from './MappedUsers/MappedUsers';
import { SearchBox } from './SearchBox/SearchBox';
import { UsersPagination } from './UsersPagination/UsersPagination';

const Users: FC = () => {
  const dispatch = useAppDispatch();

  const searchName = useSelector(selectSearchName);

  const userFriends = useSelector(selectUserFriends);

  const currentPage = useSelector(selectCurrentPage);

  const status = useSelector(selectAppStatus);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const term = searchParams.get('term') || searchName;

    const friendQuery = searchParams.get('friend') || userFriends;

    const friend = convertParam.toFriendType(friendQuery);

    const page = searchParams.get('page') || currentPage;

    dispatch(setUsersFilter({ searchName: term, userFriends: friend }));
    dispatch(setCurrentPage(+page));

    return () => {
      dispatch(resetUsersData());
    };
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [searchParams]);

  useEffect(() => {
    const params: any = {};

    const page = 1;

    if (currentPage > page) params.page = String(currentPage);
    if (searchName) params.term = searchName;
    if (userFriends === showUsers.FOLLOW) params.friend = true;
    if (userFriends === showUsers.UNFOLLOW) params.friend = false;

    setSearchParams(params);
  }, [currentPage, searchName, userFriends]);

  return (
    <Box>
      <SearchBox />

      {status === appStatus.IDLE ? <MappedUsers /> : <UsersSkeleton />}

      <UsersPagination />
    </Box>
  );
};

export default Users;
