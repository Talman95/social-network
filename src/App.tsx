import React, { FC, useEffect } from 'react';

import './App.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

import { ErrorSnackbar } from './components/common/ErrorSnackbar/ErrorSnackbar';
import { Preloader } from './components/common/Preloader/Preloader';
import { Header } from './components/layout/Header/Header';
import { Nav } from './components/layout/Nav/Nav';
import { Sidebar } from './components/layout/Sidebar/Sidebar';
import { useAppDispatch } from './hooks/useAppDispatch';
import { AppRouter } from './router/AppRouter';
import { authorize } from './store/middlewares/auth';
import { selectIsInitialized } from './store/selectors/appSelectors';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(authorize());
  }, []);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <Box>
      <ErrorSnackbar />
      <Header />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Nav />
        <AppRouter />
        <Sidebar />
      </Stack>
    </Box>
  );
};
