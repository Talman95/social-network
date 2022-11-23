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

export const uploadUserPhoto = (userPhoto: File) => ({
  type: sagaType.UPLOAD_USER_PHOTO,
  payload: { userPhoto },
});

export const updateProfile = (profile: UpdateProfileModal) => ({
  type: sagaType.UPDATE_PROFILE,
  payload: { profile },
});
