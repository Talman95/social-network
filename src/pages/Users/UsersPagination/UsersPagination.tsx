import React, { ChangeEvent, FC } from 'react';

import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setCurrentPage } from '../../../store/actions/usersActions';
import {
  selectCurrentPage,
  selectPageSize,
  selectTotalCount,
} from '../../../store/selectors/usersSelectors';
import { getCountPages } from '../../../utils/getCountPages';

export const UsersPagination: FC = () => {
  const dispatch = useAppDispatch();

  const currentPage = useSelector(selectCurrentPage);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);

  const countPages = getCountPages(totalCount, pageSize);

  const onPageChange = (event: ChangeEvent<unknown>, pageNumber: number): void => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Pagination
        sx={{ display: { xs: 'none', sm: 'block' } }}
        count={countPages}
        page={currentPage}
        onChange={onPageChange}
      />
      <Pagination
        sx={{ display: { xs: 'block', sm: 'none' } }}
        count={countPages}
        page={currentPage}
        siblingCount={0}
        onChange={onPageChange}
        size="small"
      />
    </Stack>
  );
};
