import { SET_ERROR_MESSAGE, SET_INITIALIZED } from './types/actionTypes';

export const initializedSuccess = () => ({ type: SET_INITIALIZED } as const);

export const setAppErrorMessage = (errorMessage: null | string) =>
  ({
    type: SET_ERROR_MESSAGE,
    errorMessage,
  } as const);
