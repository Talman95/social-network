import { RootState } from '../store';

export const selectAuthId = (state: RootState) => state.auth.id;

export const selectCaptchaUrl = (state: RootState) => state.auth.captchaUrl;

export const selectAuthUser = (state: RootState) => state.auth.currentUser;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
