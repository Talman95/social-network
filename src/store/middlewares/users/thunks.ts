import { usersAPI } from '../../../api/users';
import { resultCode } from '../../../enums/resultCode';
import { snackbarType } from '../../../enums/snackbarType';
import { convertParam } from '../../../utils/convertParam';
import { setAppMessage } from '../../actions/appActions';
import {
  followSuccess,
  setFriends,
  setFriendsCount,
  setTotalMembers,
  setUsers,
  togglePressingInProgress,
  unfollowSuccess,
} from '../../actions/usersActions';
import { AppThunk } from '../../store';

const firstElement = 0;

export const getUsers = (): AppThunk => async (dispatch, getState) => {
  const { currentPage, pageSize } = getState().users;
  const { userFriends, searchName } = getState().users.filter;

  const friend = convertParam.toBoolean(userFriends);

  const res = await usersAPI.getUsers({
    currentPage,
    pageSize,
    searchName,
    userFriends: friend,
  });

  dispatch(setUsers(res.items));
  dispatch(setTotalMembers(res.totalCount));
};

export const getFriends = (): AppThunk => async (dispatch, getState) => {
  const { isAuth } = getState().auth;

  if (isAuth) {
    const response = await usersAPI.getUsers({ userFriends: true });

    dispatch(setFriends(response.items));
    dispatch(setFriendsCount(response.totalCount));
  }
};

export const follow =
  (userId: number): AppThunk =>
  async dispatch => {
    dispatch(togglePressingInProgress(true, userId));
    try {
      const response = await usersAPI.follow(userId);

      if (response.resultCode === resultCode.SUCCESS) {
        dispatch(followSuccess(userId));
        dispatch(getFriends());
      } else if (response.messages.length) {
        dispatch(setAppMessage(snackbarType.ERROR, response.messages[firstElement]));
      } else {
        dispatch(setAppMessage(snackbarType.ERROR, 'Some error occurred'));
      }
    } catch (error: any) {
      dispatch(setAppMessage(snackbarType.ERROR, error.message));
    }
    dispatch(togglePressingInProgress(false, userId));
  };

export const unfollow =
  (userId: number): AppThunk =>
  async dispatch => {
    dispatch(togglePressingInProgress(true, userId));
    try {
      const response = await usersAPI.unfollow(userId);

      if (response.resultCode === resultCode.SUCCESS) {
        dispatch(unfollowSuccess(userId));
        dispatch(getFriends());
      } else if (response.messages.length) {
        dispatch(setAppMessage(snackbarType.ERROR, response.messages[firstElement]));
      } else {
        dispatch(setAppMessage(snackbarType.ERROR, 'Some error occurred'));
      }
    } catch (error: any) {
      dispatch(setAppMessage(snackbarType.ERROR, error.message));
    }
    dispatch(togglePressingInProgress(false, userId));
  };
