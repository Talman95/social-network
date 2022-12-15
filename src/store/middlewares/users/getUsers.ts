import { usersAPI } from '../../../api/users';
import { appStatus } from '../../../enums/appStatus';
import { convertParam } from '../../../utils/convertParam';
import { showNetworkErrorHandler } from '../../../utils/showAppMessageUtils';
import { setAppStatus } from '../../actions/appActions';
import { setTotalMembers, setUsers } from '../../actions/usersActions';
import { AppThunk } from '../../store';

export const getUsers = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setAppStatus(appStatus.LOADING));

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
    dispatch(setAppStatus(appStatus.IDLE));
  } catch (e: any) {
    showNetworkErrorHandler(dispatch, e);
  }
};
