import { appStatus } from '../../enums/appStatus';
import { snackbarType } from '../../enums/snackbarType';

import { appActionType } from './types/actionTypes';

export const initializedSuccess = () =>
  ({ type: appActionType.SET_INITIALIZED } as const);

export const setAppMessage = (messageType: snackbarType, message: null | string) =>
  ({
    type: appActionType.SET_APP_MESSAGE,
    payload: { messageType, message },
  } as const);

export const setAppStatus = (status: appStatus) => ({
  type: appActionType.SET_APP_STATUS,
  payload: { status },
});
