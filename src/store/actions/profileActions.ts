import { PhotosType } from '../../types/PhotosType';
import { ProfileType } from '../../types/ProfileType';
import { UpdateProfileModal } from '../reducers/profileReducer';

import { profileActionType } from './types/profileTypes';

export const addPost = () => ({ type: profileActionType.ADD_POST } as const);

export const updateMessage = (newMessage: string) =>
  ({ type: profileActionType.UPDATE_POST_MESSAGE, payload: { newMessage } } as const);

export const deletePost = (postId: number) =>
  ({ type: profileActionType.DELETE_POST, payload: { postId } } as const);

export const setUserProfile = (profile: ProfileType | null) =>
  ({ type: profileActionType.SET_USER_PROFILE, payload: { profile } } as const);

export const setProfileStatus = (status: string) =>
  ({ type: profileActionType.SET_PROFILE_STATUS, payload: { status } } as const);

export const setFriendship = (isFriend: boolean) =>
  ({
    type: profileActionType.SET_FRIENDSHIP,
    payload: { isFriend },
  } as const);

export const uploadUserPhotoSuccess = (photos: PhotosType) =>
  ({
    type: profileActionType.UPLOAD_USER_PHOTO_SUCCESS,
    payload: { photos },
  } as const);

export const updateProfileSuccess = (updatedProfile: UpdateProfileModal) =>
  ({
    type: profileActionType.UPDATE_PROFILE_SUCCESS,
    payload: { updatedProfile },
  } as const);

export const setProfileLoad = (isLoad: boolean) =>
  ({
    type: profileActionType.SET_PROFILE_LOAD,
    payload: { isLoad },
  } as const);
