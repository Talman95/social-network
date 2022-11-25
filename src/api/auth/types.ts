export type AuthMeDataType = {
  id: number;
  login: string;
  email: string;
};

export type loginValuesFormModel = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};
