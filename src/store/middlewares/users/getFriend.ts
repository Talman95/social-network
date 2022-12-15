import { usersAPI } from '../../../api/users';
import { showNetworkErrorHandler } from '../../../utils/showAppMessageUtils';
import { setFriends, setFriendsCount } from '../../actions/usersActions';
import { AppThunk } from '../../store';

export const getFriends = (): AppThunk => async (dispatch, getState) => {
  try {
    const { isAuth } = getState().auth;

    if (isAuth) {
      const res = await usersAPI.getUsers({ userFriends: true });

      dispatch(setFriends(res.items));
      dispatch(setFriendsCount(res.totalCount));
    }
  } catch (e: any) {
    showNetworkErrorHandler(dispatch, e);
  }
};
