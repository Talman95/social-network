import { UpdateProfileModal } from '../../reducers/profileReducer';

import { sagaType } from './sagaType';

export const getProfilePage = (userId: number) => ({
  type: sagaType.GET_PROFILE_PAGE,
  payload: { userId },
});

export const updateProfileStatus = (status: string) => ({
  type: sagaType.UPDATE_PROFILE_STATUS,
  payload: { status },
});

export const followUser = (userId: number, page: string) => ({
  type: sagaType.FOLLOW_USER,
  payload: { userId, page },
});

export const unfollowUser = (userId: number, page: string) => ({
  type: sagaType.UNFOLLOW_USER,
  payload: { userId, page },
});

export const uploadUserPhoto = (userPhoto: File) => ({
  type: sagaType.UPLOAD_USER_PHOTO,
  payload: { userPhoto },
});

export const updateProfile = (profile: UpdateProfileModal) => ({
  type: sagaType.UPLOAD_USER_PHOTO,
  payload: { profile },
});
