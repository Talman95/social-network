import { SnackbarMessageType } from '../../types/SnackbarMessageType';
import { initializedSuccess, setAppMessage } from '../actions/appActions';
import { appActionType } from '../actions/types/actionTypes';

const initialState = {
  isInitialized: false,
  messageType: 'error' as SnackbarMessageType,
  message: null as null | string,
};

type InitStateType = typeof initialState;
export type InitActionsType =
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAppMessage>;

export const appReducer = (
  state = initialState,
  action: InitActionsType,
): InitStateType => {
  switch (action.type) {
    case appActionType.SET_INITIALIZED:
      return { ...state, isInitialized: true };
    case appActionType.SET_APP_MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
