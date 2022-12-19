import React, { FC } from 'react';

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { protectedRoutes } from '../constants/protectedRoutes';
import { withSuspense } from '../hoc/withSuspense';
import { selectAuthId } from '../store/selectors/authSelectors';

const Login = React.lazy(() => import('../pages/Login/Login'));

const LoginSuspense = withSuspense(Login);

export const AppRouter: FC = () => {
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
          <Route path="/" element={<LoginSuspense />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Box>
  );
};
