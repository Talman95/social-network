import React, { ChangeEvent, useEffect, useState, useRef } from 'react';

import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useDebounce } from '../../../../hooks/useDebounce';
import { setFilterSearchName } from '../../../../store/actions/usersActions';
import { selectSearchName } from '../../../../store/selectors/usersSelectors';

export const SearchByName = () => {
  const dispatch = useAppDispatch();

  const searchName = useSelector(selectSearchName);

  const [searchTerm, setSearchTerm] = useState(searchName);

  const isFirstRender = useRef(true);

  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    dispatch(setFilterSearchName(searchTerm));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setSearchTerm(searchName);
  }, [searchName]);

  const onSearchTermChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  return (
    <TextField
      id="users-search"
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchTermChange}
    />
  );
};
