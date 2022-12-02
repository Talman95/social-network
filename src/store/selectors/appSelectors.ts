import { RootState } from '../store';

export const selectIsInitialized = (state: RootState) => state.app.isInitialized;
