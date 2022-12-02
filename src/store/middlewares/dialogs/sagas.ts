import { call, put, takeEvery } from 'redux-saga/effects';

import { dialogsAPI } from '../../../api/dialogs';
import { DialogsType } from '../../../types/DialogType';
import { showNetworkErrorHandler } from '../../../utils/showAppMessageUtils';
import { setDialogs } from '../../actions/dialogsActions';

import { fetchDialogs } from './actions';
import { sagaType } from './sagaType';

export function* fetchDialogsWorker() {
  try {
    const res: DialogsType[] = yield call(dialogsAPI.getAllDialogs);
    yield put(setDialogs(res));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

export function* dialogsWatcher() {
  yield takeEvery(sagaType.FETCH_DIALOGS, fetchDialogsWorker);
}

export type DialogsSagasType = ReturnType<typeof fetchDialogs>;
