import { RootState } from '../store';

export const selectProfile = (state: RootState) => state.profile.profile;

export const selectPosts = (state: RootState) => state.profile.posts;

export const selectStatus = (state: RootState) => state.profile.status;

export const selectIsFriend = (state: RootState) => state.profile.isFriend;
