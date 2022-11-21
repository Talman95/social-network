import { DialogsType } from '../../types/DialogType';
import { setDialogs } from '../actions/dialogsActions';
import { dialogsActionType } from '../actions/types/dialogsTypes';

const initialState = {
  dialogs: [] as DialogsType[],
};

type DialogsStateType = typeof initialState;
type DialogsActionType = ReturnType<typeof setDialogs>;

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionType,
): DialogsStateType => {
  switch (action.type) {
    case dialogsActionType.SET_DIALOG:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
