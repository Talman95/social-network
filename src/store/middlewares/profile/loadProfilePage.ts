import { profileAPI } from '../../../api/profile';
import { usersAPI } from '../../../api/users';
import { appStatus } from '../../../enums/appStatus';
import { snackbarType } from '../../../enums/snackbarType';
import { showNetworkErrorHandler } from '../../../utils/showAppMessageUtils';
import { setAppMessage, setAppStatus } from '../../actions/appActions';
import {
  setFriendship,
  setProfileStatus,
  setUserProfile,
} from '../../actions/profileActions';
import { AppThunk } from '../../store';

export const getUserProfile =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.getProfile(userId);

      dispatch(setUserProfile(res));
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };

export const getProfileStatus =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      const res = await profileAPI.getStatus(userId);

      dispatch(setProfileStatus(res));
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };

export const isFollow =
  (id: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      const authId = getState().auth.id;

      if (authId !== id) {
        const res = await usersAPI.isFollow(id);

        dispatch(setFriendship(res));
      }
    } catch (e: any) {
      dispatch(setAppMessage(snackbarType.ERROR, e.message));
    }
  };

export const loadProfilePage =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus(appStatus.LOADING));

      Promise.allSettled([
        dispatch(getUserProfile(userId)),
        dispatch(getProfileStatus(userId)),
        dispatch(isFollow(userId)),
      ]).finally(() => {
        dispatch(setAppStatus(appStatus.IDLE));
      });
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    }
  };
