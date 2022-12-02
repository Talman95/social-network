import { SnackbarMessageType } from '../../types/SnackbarMessageType';

import { appActionType } from './types/actionTypes';

export const initializedSuccess = () =>
  ({ type: appActionType.SET_INITIALIZED } as const);

export const setAppMessage = (messageType: SnackbarMessageType, message: null | string) =>
  ({
    type: appActionType.SET_APP_MESSAGE,
    payload: { messageType, message },
  } as const);
