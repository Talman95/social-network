import { sagaType } from './sagaType';

export const getUsers = () => ({ type: sagaType.GET_USERS });

export const getFriends = () => ({ type: sagaType.GET_FRIENDS });

export const followUser = (userId: number, page: string) => ({
  type: sagaType.FOLLOW_USER,
  payload: { userId, page },
});

export const unfollowUser = (userId: number, page: string) => ({
  type: sagaType.UNFOLLOW_USER,
  payload: { userId, page },
});
