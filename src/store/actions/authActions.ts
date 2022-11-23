import { ProfileType } from '../../types/ProfileType';

import { authActionType } from './types/authTypes';

export const setUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
) =>
  ({
    type: authActionType.SET_USER_DATA,
    payload: { id, email, login, isAuth },
  } as const);

export const setCurrentUser = (currentUser: ProfileType | null) =>
  ({
    type: authActionType.SET_CURRENT_USER,
    payload: { currentUser },
  } as const);

export const getCaptchaUrlSuccess = (url: string | null) =>
  ({
    type: authActionType.GET_CAPTCHA_URL_SUCCESS,
    payload: { url },
  } as const);
