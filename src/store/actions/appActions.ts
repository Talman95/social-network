import { appActionType } from './types/actionTypes';

export const initializedSuccess = () =>
  ({ type: appActionType.SET_INITIALIZED } as const);

export const setAppErrorMessage = (errorMessage: null | string) =>
  ({
    type: appActionType.SET_ERROR_MESSAGE,
    payload: { errorMessage },
  } as const);
