import { loginValuesFormModel } from '../../../api/auth/types';

import { sagaType } from './sagaType';

export const authorize = () => ({ type: sagaType.GET_AUTH_USER_DATA });

export const loginUser = ({
  email,
  password,
  rememberMe,
  captcha,
}: loginValuesFormModel) =>
  ({
    type: sagaType.LOGIN,
    payload: {
      email,
      password,
      rememberMe,
      captcha,
    },
  } as const);

export const logoutUser = () => ({ type: sagaType.LOGOUT });
