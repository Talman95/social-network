import { ProfileType } from '../../types/ProfileType';
import { PostType } from '../reducers/profileReducer';
import { RootState } from '../store';

export const selectProfile = (state: RootState): ProfileType | null =>
  state.profile.profile;

export const selectPosts = (state: RootState): PostType[] => state.profile.posts;

export const selectStatus = (state: RootState): string => state.profile.status;

export const selectIsFriend = (state: RootState): boolean => state.profile.isFriend;
