import { path } from '../enums/path';
import { Chat } from '../pages/Chat/Chat';
import { Dialogs } from '../pages/Dialogs/Dialogs';
import { Profile } from '../pages/Profile/Profile';
import { Settings } from '../pages/Settings/Settings';
import { Users } from '../pages/Users/Users';
import { Error404 } from '../router/Error404';

export const protectedRoutes = [
  { path: path.PROFILE, component: <Profile /> },
  { path: path.ANOTHER_PROFILE, component: <Profile /> },
  { path: path.USERS, component: <Users /> },
  { path: path.SETTINGS, component: <Settings /> },
  { path: path.CHAT, component: <Chat /> },
  { path: path.DIALOGS, component: <Dialogs /> },
  { path: path.PAGE_NOT_FOUND, component: <Error404 /> },
];
