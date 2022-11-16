import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {MessagesActionsType, messagesReducer} from "./messagesReducer";
import {UsersActionsType, usersReducer} from "./users/usersReducer";
import {AuthActionsType, authReducer} from "./auth/authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, InitActionsType} from "./app/appReducer";
import createSagaMiddleware from 'redux-saga';
import {spawn} from 'redux-saga/effects';
import {UsersSagasType, usersWatcher} from "./users/sagas";
import {authWatcher} from "./auth/sagas";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
)

sagaMiddleware.run(RootSaga)

function* RootSaga() {
    yield spawn(authWatcher) // auth
    yield spawn(usersWatcher) // users
}

export type AppActionsType =
    ProfileActionsType | MessagesActionsType
    | UsersActionsType | AuthActionsType
    | InitActionsType
    | UsersSagasType

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>