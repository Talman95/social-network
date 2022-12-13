// eslint-disable-next-line camelcase
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AuthSagasType } from './middlewares/auth/sagas';
import { ProfileSagasType } from './middlewares/profile/sagas';
import { RootSaga } from './middlewares/rootSaga';
import { UsersSagasType } from './middlewares/users/sagas';
import { appReducer, InitActionsType } from './reducers/appReducer';
import { AuthActionsType, authReducer } from './reducers/authReducer';
import { ChatActionsType, chatReducer } from './reducers/chatReducer';
import { ProfileActionsType, profileReducer } from './reducers/profileReducer';
import { UsersActionsType, usersReducer } from './reducers/usersReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  users: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
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

sagaMiddleware.run(RootSaga);

export type AppActionsType =
  | ProfileActionsType
  | UsersActionsType
  | AuthActionsType
  | InitActionsType
  | AuthSagasType
  | UsersSagasType
  | ProfileSagasType
  | ChatActionsType;

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionsType
>;
