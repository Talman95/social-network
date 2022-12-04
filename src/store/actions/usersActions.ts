import { UsersFilterType } from '../../types/UsersFilterType';
import { UserType } from '../../types/UserType';

import { usersActionType } from './types/usersTypes';

export const followSuccess = (userId: number) =>
  ({
    type: usersActionType.FOLLOW_SUCCESS,
    payload: { userId },
  } as const);

export const unfollowSuccess = (userId: number) =>
  ({
    type: usersActionType.UNFOLLOW_SUCCESS,
    payload: { userId },
  } as const);

export const setUsers = (users: Array<UserType>) =>
  ({
    type: usersActionType.SET_USERS,
    payload: { users },
  } as const);

export const setCurrentPage = (currentPage: number) =>
  ({ type: usersActionType.SET_CURRENT_PAGE, payload: { currentPage } } as const);

export const setTotalMembers = (totalCount: number) =>
  ({ type: usersActionType.SET_TOTAL_MEMBERS, payload: { totalCount } } as const);

export const togglePressingInProgress = (isPressed: boolean, userId: number) =>
  ({
    type: usersActionType.TOGGLE_PRESSING_IN_PROGRESS,
    payload: { isPressed, userId },
  } as const);

export const setUsersFilter = (filter: UsersFilterType) =>
  ({
    type: usersActionType.SET_USERS_FILTER,
    payload: {
      filter: { searchName: filter.searchName, userFriends: filter.userFriends },
      currentPage: 1,
    },
  } as const);

export const setFriends = (followings: Array<UserType>) =>
  ({ type: usersActionType.SET_FOLLOWINGS, payload: { followings } } as const);

export const setFriendsCount = (followingsCount: number) =>
  ({ type: usersActionType.SET_FOLLOWINGS_COUNT, payload: { followingsCount } } as const);
