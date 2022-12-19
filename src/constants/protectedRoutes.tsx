import React from 'react';

import { path } from '../enums/path';
import { withSuspense } from '../hoc/withSuspense';
import { Profile } from '../pages/Profile/Profile';
import { PageNotFound } from '../router/PageNotFound';

const Users = React.lazy(() => import('../pages/Users/Users'));
const Chat = React.lazy(() => import('../pages/Chat/Chat'));
const Settings = React.lazy(() => import('../pages/Settings/Settings'));

const UsersSuspense = withSuspense(Users);
const ChatSuspense = withSuspense(Chat);
const SettingsSuspense = withSuspense(Settings);

export const protectedRoutes = [
  { path: path.PROFILE, component: <Profile /> },
  { path: path.ANOTHER_PROFILE, component: <Profile /> },
  { path: path.USERS, component: <UsersSuspense /> },
  { path: path.SETTINGS, component: <SettingsSuspense /> },
  { path: path.CHAT, component: <ChatSuspense /> },
  { path: path.PAGE_NOT_FOUND, component: <PageNotFound /> },
];
