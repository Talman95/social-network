import React, { useEffect } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Preloader } from '../../components/common/Preloader/Preloader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentPage, setUsersFilter } from '../../store/actions/usersActions';
import { getUsers } from '../../store/middlewares/users/actions';
import {
  selectCurrentPage,
  selectIsFetching,
  selectSearchName,
  selectUserFriends,
} from '../../store/selectors/usersSelectors';
import { convertParam } from '../../utils/convertParam';

import { MappedUsers } from './MappedUsers/MappedUsers';
import { SearchBox } from './SearchBox/SearchBox';
import { UsersPagination } from './UsersPagination/UsersPagination';

export const Users = () => {
  const dispatch = useAppDispatch();

  const searchName = useSelector(selectSearchName);
  const userFriends = useSelector(selectUserFriends);

  const currentPage = useSelector(selectCurrentPage);

  const isFetching = useSelector(selectIsFetching);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const term = searchParams.get('term') || searchName;

    const friendQuery = searchParams.get('friend') || userFriends;

    const friend = convertParam.toFriendType(friendQuery);

    const page = searchParams.get('page') || currentPage;

    dispatch(setUsersFilter({ searchName: term, userFriends: friend }));
    dispatch(setCurrentPage(+page));
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [searchParams]);

  useEffect(() => {
    const params: any = {};

    const page = 1;

    if (currentPage > page) params.page = String(currentPage);
    if (searchName) params.term = searchName;
    if (userFriends === 'follow') params.friend = true;
    if (userFriends === 'unfollow') params.friend = false;

    setSearchParams(params);
  }, [currentPage, searchName, userFriends]);

  return (
    <Box>
      <SearchBox searchName={searchName} userFriends={userFriends} />

      {isFetching ? <Preloader /> : <MappedUsers />}

      <UsersPagination />
    </Box>
  );
};
