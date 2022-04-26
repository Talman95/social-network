import {getAuthUserData} from "./authReducer";
import {AppThunk} from "./store";

const SET_INITIALIZED = 'SET_INITIALIZED'

const initialState = {
    initialized: false,
}

export const appReducer = (state = initialState, action: InitActionsType): InitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state, initialized: true,
            }
        default:
            return state
    }
}

//actions
export const initializedSuccess = () => ({type: SET_INITIALIZED} as const)

//thunks
export const initializeApp = (): AppThunk => {
    return async (dispatch) => {
        await dispatch(getAuthUserData())
        dispatch(initializedSuccess())
    }
}

//types
type InitStateType = typeof initialState

export type InitActionsType = ReturnType<typeof initializedSuccess>
