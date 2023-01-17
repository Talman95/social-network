import React, { FC } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';

import { appStatus } from '../../../../enums/appStatus';
import { showUsers } from '../../../../enums/showUsers';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { setFilterUserFriend } from '../../../../store/actions/usersActions';
import { selectAppStatus } from '../../../../store/selectors/appSelectors';
import { selectUserFriends } from '../../../../store/selectors/usersSelectors';

export const SearchByAccessory: FC = () => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectAppStatus);
  const userFriends = useSelector(selectUserFriends);

  const onFriendsFilterChange = (e: SelectChangeEvent): void => {
    const sortingFriends = e.target.value as showUsers;

    dispatch(setFilterUserFriend(sortingFriends));
  };

  return (
    <Select
      onChange={onFriendsFilterChange}
      style={{ width: 163 }}
      value={userFriends}
      disabled={status === appStatus.LOADING}
    >
      <MenuItem value={showUsers.ALL}>All</MenuItem>
      <MenuItem value={showUsers.FOLLOW}>Only followed</MenuItem>
      <MenuItem value={showUsers.UNFOLLOW}>Only unfollowed</MenuItem>
    </Select>
  );
};
