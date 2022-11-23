import { initializedSuccess, setAppErrorMessage } from '../actions/appActions';
import { appActionType } from '../actions/types/actionTypes';

const initialState = {
  isInitialized: false,
  errorMessage: null as null | string,
};

type InitStateType = typeof initialState;
export type InitActionsType =
  | ReturnType<typeof initializedSuccess>
  | ReturnType<typeof setAppErrorMessage>;

export const appReducer = (
  state = initialState,
  action: InitActionsType,
): InitStateType => {
  switch (action.type) {
    case appActionType.SET_INITIALIZED:
      return { ...state, isInitialized: true };
    case appActionType.SET_ERROR_MESSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
