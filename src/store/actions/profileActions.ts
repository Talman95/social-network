import { PhotosType } from '../../types/PhotosType';
import { ProfileType } from '../../types/ProfileType';
import { UpdateProfileModal } from '../reducers/profileReducer';

import { ActionsType } from './types/profileTypes';

export const addPost = () => ({ type: ActionsType.ADD_POST } as const);

export const updateMessage = (newMessage: string) =>
  ({ type: ActionsType.UPDATE_POST_MESSAGE, newMessage } as const);

export const deletePost = (postId: number) =>
  ({ type: ActionsType.DELETE_POST, postId } as const);

export const setUserProfile = (profile: ProfileType | null) =>
  ({ type: ActionsType.SET_USER_PROFILE, payload: { profile } } as const);

export const setProfileStatus = (status: string) =>
  ({ type: ActionsType.SET_PROFILE_STATUS, payload: { status } } as const);

export const setFriendship = (isFriend: boolean) =>
  ({
    type: ActionsType.SET_FRIENDSHIP,
    payload: { isFriend },
  } as const);

export const uploadUserPhotoSuccess = (photos: PhotosType) =>
  ({
    type: ActionsType.UPLOAD_USER_PHOTO_SUCCESS,
    photos,
  } as const);

export const updateProfileSuccess = (updatedProfile: UpdateProfileModal) =>
  ({
    type: ActionsType.UPDATE_PROFILE_SUCCESS,
    payload: { updatedProfile },
  } as const);

export const setProfileLoad = (isLoad: boolean) =>
  ({
    type: ActionsType.SET_PROFILE_LOAD,
    payload: { isLoad },
  } as const);
