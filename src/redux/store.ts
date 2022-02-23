import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";
import {usersReducer} from "./usersReducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: usersReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);