import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { appStatus } from '../enums/appStatus';
import { snackbarType } from '../enums/snackbarType';
import { setAppMessage, setAppStatus } from '../store/actions/appActions';
import { ResponseType } from '../types/ResponseType';

export function showAppErrorHandler<D>(dispatch: Dispatch, data: ResponseType<D>) {
  if (data.messages.length) {
    const firstElement = 0;
    dispatch(setAppMessage(snackbarType.ERROR, data.messages[firstElement]));
  } else {
    dispatch(setAppMessage(snackbarType.ERROR, 'Some error occurred'));
  }
}

export function showNetworkErrorHandler(dispatch: Dispatch, e: any) {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;
    dispatch(setAppMessage(snackbarType.ERROR, error));
  } else {
    dispatch(setAppMessage(snackbarType.ERROR, `Native error ${err.message}`));
  }
  dispatch(setAppStatus(appStatus.ERROR));
}
