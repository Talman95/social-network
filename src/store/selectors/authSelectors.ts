import { ProfileType } from '../../types/ProfileType';
import { RootState } from '../store';

export const selectAuthId = (state: RootState): number | null => state.auth.id;

export const selectCaptchaUrl = (state: RootState): string | null =>
  state.auth.captchaUrl;

export const selectAuthUser = (state: RootState): ProfileType | null =>
  state.auth.currentUser;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
