import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { appStatus } from '../../../enums/appStatus';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setUsersFilter } from '../../../store/actions/usersActions';
import { selectAppStatus } from '../../../store/selectors/appSelectors';
import { FriendUiType } from '../../../types/FriendUiType';

type PropsType = {
  searchName: string;
  userFriends: FriendUiType;
};

export const SearchBox: FC<PropsType> = ({ searchName, userFriends }) => {
  const dispatch = useAppDispatch();

  const status = useSelector(selectAppStatus);

  const [searchTerm, setSearchTerm] = useState(searchName);
  const [friends, setFriends] = useState(userFriends);

  useEffect(() => {
    setSearchTerm(searchName);

    setFriends(userFriends);
  }, [searchName, userFriends]);

  const onSearchTermChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const onSearchNameChange = () => {
    dispatch(setUsersFilter({ searchName: searchTerm, userFriends: friends }));
  };

  const onFriendsFilterChange = (e: SelectChangeEvent) => {
    const resultFriend = e.target.value as FriendUiType;

    setFriends(resultFriend);
    dispatch(setUsersFilter({ searchName: searchTerm, userFriends: resultFriend }));
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
      <TextField
        id="users-search"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchTermChange}
        disabled={status === appStatus.LOADING}
      />

      <Select
        labelId="select-label"
        id="simple-select"
        onChange={onFriendsFilterChange}
        style={{ width: 163 }}
        value={friends}
        disabled={status === appStatus.LOADING}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="follow">Only followed</MenuItem>
        <MenuItem value="unfollow">Only unfollowed</MenuItem>
      </Select>

      <Button
        variant="contained"
        onClick={onSearchNameChange}
        disabled={status === appStatus.LOADING}
      >
        Search
      </Button>
    </Stack>
  );
};
