import {getAuthUserData} from "./authReducer";
import {AppThunk} from "./store";

const SET_INITIALIZED = 'SET_INITIALIZED'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const initialState: InitStateType = {
    initialized: false,
    errorMessage: null,
}

export const appReducer = (state = initialState, action: InitActionsType): InitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true}
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state
    }
}

//actions
export const initializedSuccess = () => ({type: SET_INITIALIZED} as const)
export const setAppErrorMessage = (errorMessage: null | string) => ({type: SET_ERROR_MESSAGE, errorMessage} as const)

//thunks
export const initializeApp = (): AppThunk => {
    return async (dispatch) => {
        dispatch(getAuthUserData())
        dispatch(initializedSuccess())
    }
}

//types
type InitStateType = {
    initialized: boolean
    errorMessage: null | string
}

export type InitActionsType =
    | ReturnType<typeof initializedSuccess>
    | ReturnType<typeof setAppErrorMessage>