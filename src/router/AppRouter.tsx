import React from 'react';

import Box from '@mui/material/Box';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dialogs } from '../components/Dialogs/Dialogs';
import Messages from '../components/Messages/Messages';
import { useAppSelector } from '../hooks/useAppSelector';
import { Chat } from '../pages/Chat/Chat';
import { Login } from '../pages/Login/Login';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';
import { Users } from '../pages/Users/Users';
import { ReturnComponentType } from '../types/ReturnComponentType';

import { Error404 } from './Error404';

export const AppRouter = (): ReturnComponentType => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  return (
    <Box flex={4} p={2}>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/messages/*" element={<Messages />} />
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
