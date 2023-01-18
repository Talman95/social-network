import React, { FC, useEffect, useRef } from 'react';

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

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const term = searchParams.get('term') || searchName;
      const page = searchParams.get('page') || currentPage;
      const friendQuery = searchParams.get('friend') || userFriends;
      const friend = convertParam.toFriendType(friendQuery);

      dispatch(setUsersFilter({ searchName: term, userFriends: friend }));
      dispatch(setCurrentPage(+page));

      isSearch.current = true;
    }

    return () => {
      dispatch(resetUsersData());
    };
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(getUsers());
    }

    if (isSearch.current) {
      isSearch.current = false;
    }
  }, [currentPage, searchName, userFriends]);

  useEffect(() => {
    if (isMounted.current) {
      const params: any = {};

      const page = 1;

      if (currentPage > page) params.page = String(currentPage);
      if (searchName) params.term = searchName;
      if (userFriends === showUsers.FOLLOW) params.friend = true;
      if (userFriends === showUsers.UNFOLLOW) params.friend = false;

      setSearchParams(params);
    }

    if (!isMounted.current) {
      isMounted.current = true;
    }
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
