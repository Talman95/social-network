import { appStatus } from '../../../enums/appStatus';
import { snackbarType } from '../../../enums/snackbarType';
import {
  initializedSuccess,
  setAppMessage,
  setAppStatus,
} from '../../actions/appActions';
import { appReducer, InitAppStateType } from '../appReducer';

let startState: InitAppStateType = {
  isInitialized: false,
  messageType: snackbarType.ERROR,
  message: null,
  status: appStatus.IDLE,
};

beforeEach(() => {
  startState = {
    isInitialized: false,
    messageType: snackbarType.ERROR,
    message: null,
    status: appStatus.IDLE,
  };
});

test('correct initialization should succeed', () => {
  const endState = appReducer(startState, initializedSuccess());

  expect(endState.isInitialized).toBe(true);
});

test('correct message should be set', () => {
  const message = 'Success message';

  const endState = appReducer(startState, setAppMessage(snackbarType.SUCCESS, message));

  expect(endState.messageType).toBe(snackbarType.SUCCESS);
  expect(endState.message).toBe(message);
});

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatus(appStatus.LOADING));

  expect(endState.status).toBe(appStatus.LOADING);
});
