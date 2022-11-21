import { profileAPI } from '../../../api/profile';
import { usersAPI } from '../../../api/users';
import { resultCode } from '../../../enums/resultCode';
import { setAppErrorMessage } from '../../actions/appActions';
import {
  setFriendship,
  setProfileLoad,
  setProfileStatus,
  setUserProfile,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../actions/profileActions';
import { UpdateProfileModal } from '../../reducers/profileReducer';
import { AppStateType, AppThunk } from '../../store';
import { getFriends } from '../users/thunks';

const FIRST_ELEMENT = 0;

export const getUserProfile =
  (userId: number): AppThunk =>
  async dispatch => {
    const response = await profileAPI.getProfile(userId);

    dispatch(setUserProfile(response.data));
  };

export const getProfileStatus =
  (userId: number): AppThunk =>
  async dispatch => {
    const response = await profileAPI.getStatus(userId);

    dispatch(setProfileStatus(response.data));
  };

export const isFollow =
  (id: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      const authId = getState().auth.id;

      if (authId !== id) {
        const response = await usersAPI.isFollow(id);

        dispatch(setFriendship(response));
      }
    } catch (e: any) {
      dispatch(setAppErrorMessage(e.message));
    }
  };

export const loadProfilePage =
  (userId: number): AppThunk =>
  async dispatch => {
    dispatch(setProfileLoad(true));
    await Promise.allSettled([
      dispatch(getUserProfile(userId)),
      dispatch(getProfileStatus(userId)),
      dispatch(isFollow(userId)),
    ]);
    dispatch(setProfileLoad(false));
  };

export const updateProfileStatus =
  (status: string): AppThunk =>
  async dispatch => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === resultCode.SUCCESS) {
      dispatch(setProfileStatus(status));
    }
  };

export const followFromProfile =
  (id: number): AppThunk =>
  async dispatch => {
    try {
      const response = await usersAPI.follow(id);

      if (response.resultCode === resultCode.SUCCESS) {
        dispatch(setFriendship(true));
        dispatch(getFriends());
      }
    } catch (e: any) {
      dispatch(setAppErrorMessage(e.message));
    }
  };

export const unfollowFromProfile =
  (id: number): AppThunk =>
  async dispatch => {
    try {
      const response = await usersAPI.unfollow(id);

      if (response.resultCode === resultCode.SUCCESS) {
        dispatch(setFriendship(false));
        dispatch(getFriends());
      }
    } catch (e: any) {
      dispatch(setAppErrorMessage(e.message));
    }
  };

export const uploadUserPhoto =
  (userPhoto: File): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.uploadPhoto(userPhoto);

      if (res.data.resultCode === resultCode.SUCCESS) {
        dispatch(uploadUserPhotoSuccess(res.data.data.photos));
      } else if (res.data.messages.length) {
        dispatch(setAppErrorMessage(res.data.messages[FIRST_ELEMENT]));
      } else {
        dispatch(setAppErrorMessage('Some error occurred'));
      }
    } catch (err: any) {
      dispatch(setAppErrorMessage(err.message));
    }
  };

export const updateProfile =
  (profileData: UpdateProfileModal): AppThunk =>
  async (dispatch, getState: () => AppStateType) => {
    try {
      const { id } = getState().auth;

      if (id) {
        const updatedProfile = { ...profileData, userId: id };
        const res = await profileAPI.updateProfile(updatedProfile);

        if (res.data.resultCode === resultCode.SUCCESS) {
          dispatch(updateProfileSuccess(profileData));
        } else if (res.data.messages.length) {
          dispatch(setAppErrorMessage(res.data.messages[FIRST_ELEMENT]));
        } else {
          dispatch(setAppErrorMessage('Some error occurred'));
        }
      }
    } catch (error: any) {
      dispatch(setAppErrorMessage(error.message));
    }
  };
