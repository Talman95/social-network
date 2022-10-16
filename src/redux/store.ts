import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {MessagesActionsType, messagesReducer} from "./messagesReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {AuthActionsType, authReducer} from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, InitActionsType} from "./appReducer";
import {followingReducer, FriendsActionsType} from "./followingReducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    following: followingReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export type AppActionsType =
    ProfileActionsType | MessagesActionsType
    | UsersActionsType | AuthActionsType
    | InitActionsType | FriendsActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>