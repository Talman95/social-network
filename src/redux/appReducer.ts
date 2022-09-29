import {getAuthUserData} from "./authReducer";
import {AppThunk} from "./store";

const SET_INITIALIZED = 'app/SET_INITIALIZED'
const SET_ERROR_MESSAGE = 'app/SET_ERROR_MESSAGE'

const initialState: InitStateType = {
    isInitialized: false,
    errorMessage: null,
}

export const appReducer = (state = initialState, action: InitActionsType): InitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, isInitialized: true}
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
        await dispatch(getAuthUserData())
        await dispatch(initializedSuccess())
    }
}

//types
type InitStateType = {
    isInitialized: boolean
    errorMessage: null | string
}

export type InitActionsType =
    | ReturnType<typeof initializedSuccess>
    | ReturnType<typeof setAppErrorMessage>