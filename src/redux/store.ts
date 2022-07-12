import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {MessagesActionsType, messagesReducer} from "./messagesReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {AuthActionsType, authReducer} from "./authReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, InitActionsType} from "./appReducer";
import {FriendsActionsType, friendsReducer} from "./friendsReducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    auth: authReducer,
    app: appReducer,
    friends: friendsReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    ProfileActionsType | MessagesActionsType
    | UsersActionsType | AuthActionsType
    | InitActionsType | FriendsActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>