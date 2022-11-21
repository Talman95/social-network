import React, { ChangeEvent, FC, MouseEvent, useEffect } from 'react';

import { Box, Card, CardContent, Pagination, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentPage, setUsersFilter } from '../../store/actions/usersActions';
import { UserType } from '../../types/UserType';
import { FriendTypeConverter, getCountPages } from '../../utils/utils';
import { Preloader } from '../common/Preloader/Preloader';

import { UsersSearchBox } from './SearchBox/UsersSearchBox';
import { User } from './User/User';

type UsersPropsType = {
  users: Array<UserType>;
  follow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void;
  unfollow: (e: MouseEvent<HTMLButtonElement>, userID: number) => void;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  switchPage: (event: ChangeEvent<unknown>, pageNumber: number) => void;
  isFetching: boolean;
  pressingInProgress: Array<number>;
};

const NO_USERS = 0;

export const Users: FC<UsersPropsType> = ({
  users,
  follow,
  unfollow,
  currentPage,
  pageSize,
  totalCount,
  switchPage,
  isFetching,
  pressingInProgress,
}) => {
  const mappedUsers =
    users.length === NO_USERS ? (
      <Card sx={{ margin: 1 }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>Users not found</Typography>
        </CardContent>
      </Card>
    ) : (
      users.map(user => (
        <User
          key={user.id}
          user={user}
          follow={follow}
          unfollow={unfollow}
          pressingInProgress={pressingInProgress}
        />
      ))
    );

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchName = useAppSelector(state => state.users.filter.searchName);
  const userFriends = useAppSelector(state => state.users.filter.userFriends);
  const countPages = getCountPages(totalCount, pageSize);

  useEffect(() => {
    const term = searchParams.get('term') || searchName;

    const friendQuery = searchParams.get('friend') || userFriends;

    const friend = FriendTypeConverter.toFriendType(friendQuery);

    const page = searchParams.get('page') || currentPage;

    dispatch(setUsersFilter({ searchName: term, userFriends: friend }));
    dispatch(setCurrentPage(+page));

    return () => {
      dispatch(setUsersFilter({ searchName: '', userFriends: 'all' }));
    };
  }, []);

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
      <UsersSearchBox
        searchName={searchName}
        userFriends={userFriends}
        isFetching={isFetching}
      />
      {isFetching ? <Preloader /> : mappedUsers}
      <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Pagination
          sx={{ display: { xs: 'none', sm: 'block' } }}
          count={countPages}
          page={currentPage}
          onChange={switchPage}
        />
        <Pagination
          sx={{ display: { xs: 'block', sm: 'none' } }}
          count={countPages}
          page={currentPage}
          siblingCount={0}
          onChange={switchPage}
          size="small"
        />
      </Stack>
    </Box>
  );
};
