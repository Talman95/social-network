import React from 'react';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { protectedRoutes } from '../constants/protectedRoutes';
import { Login } from '../pages/Login/Login';
import { selectAuthId } from '../store/selectors/authSelectors';

export const AppRouter = () => {
  const id = useSelector(selectAuthId);

  return (
    <Box flex={4} p={2}>
      {id ? (
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />

          {protectedRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
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
