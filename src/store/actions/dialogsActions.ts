import { DialogsType } from '../../types/DialogType';

import { dialogsActionType } from './types/dialogsTypes';

export const setDialogs = (dialogs: DialogsType[]) =>
  ({
    type: dialogsActionType.SET_DIALOG,
    payload: { dialogs },
  } as const);
