import { ProfileType } from '../../types/ProfileType';
import {
  addPost,
  deletePost,
  setFriendship,
  setProfileStatus,
  setUserProfile,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../actions/profileActions';
import { profileActionType } from '../actions/types/profileTypes';

const initialState = {
  profile: null as ProfileType | null,
  posts: [{ id: 1, message: 'Hi, how are you guys?' }] as PostType[],
  status: '',
  isFriend: false,
};

export type PostType = {
  id: number;
  message: string;
};
export type ProfileStateType = typeof initialState;
export type UploadUserPhotoSuccessType = ReturnType<typeof uploadUserPhotoSuccess>;
export type UpdateProfileSuccessType = ReturnType<typeof updateProfileSuccess>;
export type UpdateProfileModel = {
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
  };
  aboutMe: string;
};
export type ProfileActionsType =
  | ReturnType<typeof addPost>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setProfileStatus>
  | ReturnType<typeof setFriendship>
  | UploadUserPhotoSuccessType
  | UpdateProfileSuccessType;

export const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionsType,
): ProfileStateType => {
  switch (action.type) {
    case profileActionType.ADD_POST: {
      const newPost = {
        id: new Date().getTime(),
        message: action.payload.message,
      };

      return { ...state, posts: [newPost, ...state.posts] };
    }
    case profileActionType.DELETE_POST: {
      return {
        ...state,
        posts: [...state.posts.filter(p => p.id !== action.payload.postId)],
      };
    }
    case profileActionType.SET_USER_PROFILE:
    case profileActionType.SET_PROFILE_STATUS:
    case profileActionType.SET_FRIENDSHIP:
      return {
        ...state,
        ...action.payload,
      };
    case profileActionType.UPLOAD_USER_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload.photos } as ProfileType,
      };
    case profileActionType.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: state.profile
          ? ({ ...state.profile, ...action.payload.updatedProfile } as ProfileType)
          : state.profile,
      };
    default:
      return state;
  }
};
