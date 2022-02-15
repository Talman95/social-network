import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";


const rootReducer = combineReducers({
    profile: profileReducer,
    messages: messagesReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);