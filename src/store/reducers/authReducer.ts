import { ProfileType } from '../../types/ProfileType';
import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../actions/authActions';
import { authActionType } from '../actions/types/authTypes';
import { profileActionType } from '../actions/types/profileTypes';

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
    case authActionType.SET_USER_DATA:
    case authActionType.SET_CURRENT_USER:
    case authActionType.GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case profileActionType.UPLOAD_USER_PHOTO_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          photos: action.payload.photos,
        } as ProfileType,
      };
    case profileActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload.updatedProfile,
        } as ProfileType,
      };
    default:
      return state;
  }
};
