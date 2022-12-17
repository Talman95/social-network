import React, { useEffect, useState } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';

import { appStatus } from '../../../../enums/appStatus';
import { showUsers } from '../../../../enums/showUsers';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { setFilterUserFriend } from '../../../../store/actions/usersActions';
import { selectAppStatus } from '../../../../store/selectors/appSelectors';
import { selectUserFriends } from '../../../../store/selectors/usersSelectors';

export const SearchByAccessory = () => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectAppStatus);
  const userFriends = useSelector(selectUserFriends);

  const [friends, setFriends] = useState(userFriends);

  useEffect(() => {
    setFriends(userFriends);
  }, [userFriends]);

  const onFriendsFilterChange = (e: SelectChangeEvent) => {
    const resultFriend = e.target.value as showUsers;

    setFriends(resultFriend);
    dispatch(setFilterUserFriend(resultFriend));
  };

  return (
    <Select
      onChange={onFriendsFilterChange}
      style={{ width: 163 }}
      value={friends}
      disabled={status === appStatus.LOADING}
    >
      <MenuItem value={showUsers.ALL}>All</MenuItem>
      <MenuItem value={showUsers.FOLLOW}>Only followed</MenuItem>
      <MenuItem value={showUsers.UNFOLLOW}>Only unfollowed</MenuItem>
    </Select>
  );
};
