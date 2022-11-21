import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { dialogsAPI } from '../../../api/dialogs';
import { DialogsType } from '../../../types/DialogType';
import { setDialogs } from '../../actions/dialogsActions';

const GET_DIALOGS = 'GET_DIALOGS';

export function* fetchDialogsWorker() {
  const res: AxiosResponse<DialogsType[]> = yield call(dialogsAPI.getAllDialogs);
  yield put(setDialogs(res.data));
}

export function* dialogsWatcher() {
  yield takeEvery(GET_DIALOGS, fetchDialogsWorker);
}

export const fetchDialogs = () => ({ type: GET_DIALOGS });
