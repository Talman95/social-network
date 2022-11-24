import { RootState } from '../store';

export const selectAuthId = (state: RootState) => state.auth.id;
