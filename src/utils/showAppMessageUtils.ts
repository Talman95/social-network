import axios, { AxiosError } from 'axios';
import { put } from 'redux-saga/effects';

import { snackbarType } from '../enums/snackbarType';
import { setAppMessage } from '../store/actions/appActions';
import { ResponseType } from '../types/ResponseType';

export function* showAppErrorHandler<D>(data: ResponseType<D>) {
  if (data.messages.length) {
    const firstElement = 0;
    yield put(setAppMessage(snackbarType.ERROR, data.messages[firstElement]));
  } else {
    yield put(setAppMessage(snackbarType.ERROR, 'Some error occurred'));
  }
}

export function* showNetworkErrorHandler(e: any) {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;
    yield put(setAppMessage(snackbarType.ERROR, error));
  } else {
    yield put(setAppMessage(snackbarType.ERROR, `Native error ${err.message}`));
  }
}
