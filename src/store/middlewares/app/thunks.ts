import { initializedSuccess } from '../../actions/appActions';
import { AppThunk } from '../../store';
import { getAuthUserData } from '../auth/thunks';

export const initializeApp = (): AppThunk => async dispatch => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};
