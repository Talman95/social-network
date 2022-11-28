import { PhotosType } from '../../types/PhotosType';
import { ProfileType } from '../../types/ProfileType';
import { UpdateProfileModel } from '../reducers/profileReducer';

import { profileActionType } from './types/profileTypes';

export const addPost = (message: string) =>
  ({
    type: profileActionType.ADD_POST,
    payload: { message },
  } as const);

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

export const updateProfileSuccess = (updatedProfile: UpdateProfileModel) =>
  ({
    type: profileActionType.UPDATE_PROFILE_SUCCESS,
    payload: { updatedProfile },
  } as const);

export const setIsFetching = (isFetching: boolean) =>
  ({
    type: profileActionType.SET_IS_FETCHING,
    payload: { isFetching },
  } as const);
