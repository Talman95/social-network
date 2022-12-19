import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

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

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export type AppActionsType =
  | ProfileActionsType
  | UsersActionsType
  | AuthActionsType
  | InitActionsType
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
