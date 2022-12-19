import { appStatus } from '../../enums/appStatus';
import { snackbarType } from '../../enums/snackbarType';
import { RootState } from '../store';

export const selectIsInitialized = (state: RootState): boolean => state.app.isInitialized;

export const selectAppMessage = (state: RootState): string | null => state.app.message;

export const selectAppTypeMessage = (state: RootState): snackbarType =>
  state.app.messageType;

export const selectAppStatus = (state: RootState): appStatus => state.app.status;
