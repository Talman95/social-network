import { DialogsType } from '../../types/DialogType';
import { RootState } from '../store';

export const selectDialogs = (state: RootState): DialogsType[] => state.dialogs.dialogs;
