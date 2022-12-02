import { RootState } from '../store';

export const selectIsInitialized = (state: RootState) => state.app.isInitialized;

export const selectAppMessage = (state: RootState) => state.app.message;

export const selectAppTypeMessage = (state: RootState) => state.app.messageType;
