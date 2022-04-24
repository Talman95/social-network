import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {MessagesActionsType, messagesReducer} from "./messagesReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {AuthActionsType, authReducer} from "./authReducer";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer,
    auth: authReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType = ProfileActionsType | MessagesActionsType | UsersActionsType | AuthActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>