import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {messagesReducer} from "./messagesReducer";


const reducers = combineReducers({
    profile: profileReducer,
    messages: messagesReducer
})
export const store = createStore(reducers);

export type ReduxStoreType = typeof store;