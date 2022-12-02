import React from 'react';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Chat } from '../pages/Chat/Chat';
import { Dialogs } from '../pages/Dialogs/Dialogs';
import { Login } from '../pages/Login/Login';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';
import { Users } from '../pages/Users/Users';
import { selectIsAuth } from '../store/selectors/authSelectors';

import { Error404 } from './Error404';

export const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Box flex={4} p={2}>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/dialogs" element={<Dialogs />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Box>
  );
};
