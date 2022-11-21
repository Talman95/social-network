import { initializedSuccess, setAppErrorMessage } from '../actions/appActions';
import { SET_ERROR_MESSAGE, SET_INITIALIZED } from '../actions/types/actionTypes';
import { getAuthUserData } from '../middlewares/auth/thunks';
import { AppThunk } from '../store';

const initialState = {
  isInitialized: false,
  errorMessage: null as null | string,
};

type InitStateType = typeof initialState;
export type InitActionsType =
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAppErrorMessage>;

export const appReducer = (
  state = initialState,
  action: InitActionsType,
): InitStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, isInitialized: true };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

// thunks
export const initializeApp = (): AppThunk => async dispatch => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};
