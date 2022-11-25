import { RootState } from '../store';

export const selectAuthId = (state: RootState) => state.auth.id;

export const selectCaptchaUrl = (state: RootState) => state.auth.captchaUrl;
