import { UserType } from '../../types/UserType';
import { UsersFilterType } from '../reducers/usersReducer';

import { ACTIONS_TYPE } from './types/usersTypes';

export const followSuccess = (userID: number) =>
  ({
    type: ACTIONS_TYPE.FOLLOW_SUCCESS,
    userID,
  } as const);

export const unfollowSuccess = (userID: number) =>
  ({
    type: ACTIONS_TYPE.UNFOLLOW_SUCCESS,
    userID,
  } as const);

export const setUsers = (users: Array<UserType>) =>
  ({
    type: ACTIONS_TYPE.SET_USERS,
    payload: { users },
  } as const);

export const setCurrentPage = (currentPage: number) =>
  ({ type: ACTIONS_TYPE.SET_CURRENT_PAGE, payload: { currentPage } } as const);

export const setTotalMembers = (totalCount: number) =>
  ({ type: ACTIONS_TYPE.SET_TOTAL_MEMBERS, payload: { totalCount } } as const);

export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: ACTIONS_TYPE.TOGGLE_IS_FETCHING, payload: { isFetching } } as const);

export const togglePressingInProgress = (isPressed: boolean, userId: number) =>
  ({ type: ACTIONS_TYPE.TOGGLE_PRESSING_IN_PROGRESS, isPressed, userId } as const);

export const setUsersFilter = (filter: UsersFilterType) =>
  ({
    type: ACTIONS_TYPE.SET_USERS_FILTER,
    payload: {
      filter: { searchName: filter.searchName, userFriends: filter.userFriends },
      currentPage: 1,
    },
  } as const);

export const setFriends = (followings: Array<UserType>) =>
  ({ type: ACTIONS_TYPE.SET_FOLLOWINGS, payload: { followings } } as const);

export const setFriendsCount = (followingsCount: number) =>
  ({ type: ACTIONS_TYPE.SET_FOLLOWINGS_COUNT, payload: { followingsCount } } as const);
