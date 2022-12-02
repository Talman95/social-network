import { ResponseType } from '../../types/ResponseType';
import { instance } from '../config';

import { AuthMeDataType, loginValuesFormModel } from './types';

export const authAPI = {
  async authMe() {
    const res = await instance.get<ResponseType<AuthMeDataType>>('/auth/me');

    return res.data;
  },

  async login({ email, password, rememberMe, captcha }: loginValuesFormModel) {
    const res = await instance.post<ResponseType<{ userId: number }>>('/auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    });

    return res.data;
  },

  async logout() {
    const res = await instance.delete<ResponseType<{}>>('/auth/login');

    return res.data;
  },

  async getCaptcha() {
    const res = await instance.get<{ url: string }>('/security/get-captcha-url');

    return res.data;
  },
};
