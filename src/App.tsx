import React, { useEffect } from 'react';

import './App.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { ErrorSnackbar } from './components/common/ErrorSnackbar/ErrorSnackbar';
import { Preloader } from './components/common/Preloader/Preloader';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { Nav } from './components/layout/Nav/Nav';
import { Sidebar } from './components/layout/Sidebar/Sidebar';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { AppRouter } from './router/AppRouter';
import { authorize } from './store/middlewares/auth/actions';
import { ReturnComponentType } from './types/ReturnComponentType';

export const App = (): ReturnComponentType => {
  const dispatch = useAppDispatch();

  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    dispatch(authorize());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <Box>
      <ErrorSnackbar />
      <HeaderContainer />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Nav />
        <AppRouter />
        <Sidebar />
      </Stack>
    </Box>
  );
};
