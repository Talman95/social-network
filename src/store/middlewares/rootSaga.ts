import { spawn } from 'redux-saga/effects';

import { authWatcher } from './auth/sagas';
import { dialogsWatcher } from './dialogs/sagas';
import { profileWatcher } from './profile/sagas';
import { usersWatcher } from './users/sagas';

export function* RootSaga() {
  yield spawn(authWatcher);
  yield spawn(profileWatcher);
  yield spawn(usersWatcher);
  yield spawn(dialogsWatcher);
}
