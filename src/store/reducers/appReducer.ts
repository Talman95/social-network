import { appStatus } from '../../enums/appStatus';
import { AppStatusType } from '../../types/AppStatusType';
import { SnackbarMessageType } from '../../types/SnackbarMessageType';
import { initializedSuccess, setAppMessage, setAppStatus } from '../actions/appActions';
import { appActionType } from '../actions/types/actionTypes';

const initialState = {
  isInitialized: false,
  messageType: 'error' as SnackbarMessageType,
  message: null as null | string,
  status: appStatus.IDLE as AppStatusType,
};

export type InitAppStateType = typeof initialState;
export type InitActionsType =
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAppMessage>
  | ReturnType<typeof setAppStatus>;

export const appReducer = (
  state = initialState,
  action: InitActionsType,
): InitAppStateType => {
  switch (action.type) {
    case appActionType.SET_INITIALIZED:
      return { ...state, isInitialized: true };
    case appActionType.SET_APP_MESSAGE:
    case appActionType.SET_APP_STATUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
