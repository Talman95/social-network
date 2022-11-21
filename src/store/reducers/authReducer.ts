import { ProfileType } from '../../types/ProfileType';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../actions/authActions';
import {
  GET_CAPTCHA_URL_SUCCESS,
  SET_CURRENT_USER,
  SET_USER_DATA,
} from '../actions/types/authTypes';
import { ActionsType } from '../actions/types/profileTypes';

import { UpdateProfileSuccessType, UploadUserPhotoSuccessType } from './profileReducer';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  currentUser: null as ProfileType | null,
  captchaUrl: null as string | null,
};

export type AuthStateType = typeof initialState;
export type AuthActionsType =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof getCaptchaUrlSuccess>
  | UploadUserPhotoSuccessType
  | UpdateProfileSuccessType;

export const authReducer = (
  state = initialState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case ActionsType.UPLOAD_USER_PHOTO_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, photos: action.photos } as ProfileType,
      };
    case ActionsType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload.updatedProfile,
        } as ProfileType,
      };
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, captchaUrl: action.url };
    default:
      return state;
  }
};
