import React from 'react';

import Box from '@mui/material/Box';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ChatPage } from '../components/Chat/ChatPage';
import { Dialogs } from '../components/Dialogs/Dialogs';
import { Login } from '../components/Login/Login';
import Messages from '../components/Messages/Messages';
import { Settings } from '../components/Settings/Settings';
import { UsersContainer } from '../components/Users/UsersContainer';
import { useAppSelector } from '../hooks/useAppSelector';
import { Profile } from '../pages/Profile/Profile';
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
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/users" element={<UsersContainer />} />
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
