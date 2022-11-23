import { formValuesModel } from '../../../components/Login/Login';

import { sagaType } from './sagaType';

export const authorize = () => ({ type: sagaType.GET_AUTH_USER_DATA });

export const loginUser = ({ email, password, rememberMe, captcha }: formValuesModel) =>
  ({
    type: sagaType.LOGIN,
    email,
    password,
    rememberMe,
    captcha,
  } as const);

export const logoutUser = () => ({ type: sagaType.LOGOUT });
