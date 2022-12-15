import { usersAPI } from '../../../api/users';
import { followUnfollowFrom } from '../../../enums/followUnfollowFrom';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { setFriendship } from '../../actions/profileActions';
import { followSuccess, togglePressingInProgress } from '../../actions/usersActions';
import { AppThunk } from '../../store';

import { getFriends } from './getFriend';

const followHelper =
  (userId: number, page: followUnfollowFrom): AppThunk =>
  async dispatch => {
    if (page === followUnfollowFrom.PROFILE) {
      dispatch(setFriendship(true));
    } else {
      dispatch(followSuccess(userId));
    }
    dispatch(getFriends());
  };

export const follow =
  (userId: number, page: followUnfollowFrom): AppThunk =>
  async dispatch => {
    try {
      dispatch(togglePressingInProgress(true, userId));

      const res = await usersAPI.follow(userId);

      if (res.resultCode === resultCode.SUCCESS) {
        dispatch(followHelper(userId, page));
      } else {
        showAppErrorHandler(dispatch, res);
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    } finally {
      dispatch(togglePressingInProgress(false, userId));
    }
  };
