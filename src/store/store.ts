// eslint-disable-next-line camelcase
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { appReducer, InitActionsType } from './app/appReducer';
import { AuthActionsType, authReducer } from './auth/authReducer';
import { authWatcher } from './auth/sagas';
import { MessagesActionsType, messagesReducer } from './messagesReducer';
import { ProfileActionsType, profileReducer } from './profileReducer';
import { UsersSagasType, usersWatcher } from './users/sagas';
import { UsersActionsType, usersReducer } from './users/usersReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
);

function* RootSaga() {
  yield spawn(authWatcher);
  yield spawn(usersWatcher);
}

sagaMiddleware.run(RootSaga);

export type AppActionsType =
  | ProfileActionsType
  | MessagesActionsType
  | UsersActionsType
  | AuthActionsType
  | InitActionsType
  | UsersSagasType;

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
>;
