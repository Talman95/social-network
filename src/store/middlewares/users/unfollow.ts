import { usersAPI } from '../../../api/users';
import { followUnfollowFrom } from '../../../enums/followUnfollowFrom';
import { resultCode } from '../../../enums/resultCode';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { setFriendship } from '../../actions/profileActions';
import { togglePressingInProgress, unfollowSuccess } from '../../actions/usersActions';
import { AppThunk } from '../../store';

import { getFriends } from './getFriend';

const unfollowHelper =
  (userId: number, page: followUnfollowFrom): AppThunk =>
  async dispatch => {
    if (page === followUnfollowFrom.PROFILE) {
      dispatch(setFriendship(false));
    } else {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(getFriends());
  };

export const unfollow =
  (userId: number, page: followUnfollowFrom): AppThunk =>
  async dispatch => {
    try {
      dispatch(togglePressingInProgress(true, userId));

      const res = await usersAPI.unfollow(userId);

      if (res.resultCode === resultCode.SUCCESS) {
        dispatch(unfollowHelper(userId, page));
      } else {
        showAppErrorHandler(dispatch, res);
      }
    } catch (e: any) {
      showNetworkErrorHandler(dispatch, e);
    } finally {
      dispatch(togglePressingInProgress(false, userId));
    }
  };
