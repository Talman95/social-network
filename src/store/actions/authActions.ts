import { ProfileType } from '../../types/ProfileType';

import {
  GET_CAPTCHA_URL_SUCCESS,
  SET_CURRENT_USER,
  SET_USER_DATA,
} from './types/authTypes';

export const setUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } } as const);

export const setCurrentUser = (currentUser: ProfileType | null) =>
  ({
    type: SET_CURRENT_USER,
    currentUser,
  } as const);

export const getCaptchaUrlSuccess = (url: string | null) =>
  ({
    type: GET_CAPTCHA_URL_SUCCESS,
    url,
  } as const);
