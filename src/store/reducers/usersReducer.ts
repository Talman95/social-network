import { showUsers } from '../../enums/showUsers';
import { UsersFilterType } from '../../types/UsersFilterType';
import { UserType } from '../../types/UserType';
import { usersActionType } from '../actions/types/usersTypes';
import {
  followSuccess,
  resetUsersData,
  setCurrentPage,
  setFilterSearchName,
  setFilterUserFriend,
  setFriends,
  setFriendsCount,
  setTotalMembers,
  setUsers,
  setUsersFilter,
  togglePressingInProgress,
  unfollowSuccess,
} from '../actions/usersActions';

export const initialState = {
  users: [] as Array<UserType>,
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  pressingInProgress: [] as Array<number>,
  filter: {
    searchName: '',
    userFriends: 'all',
  } as UsersFilterType,
  followings: [] as UserType[],
  followingsCount: 0,
};

export type UsersStateType = typeof initialState;
export type UsersActionsType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalMembers>
  | ReturnType<typeof togglePressingInProgress>
  | ReturnType<typeof setUsersFilter>
  | ReturnType<typeof setFriends>
  | ReturnType<typeof setFriendsCount>
  | ReturnType<typeof setFilterSearchName>
  | ReturnType<typeof setFilterUserFriend>
  | ReturnType<typeof resetUsersData>;

export const usersReducer = (
  state = initialState,
  action: UsersActionsType,
): UsersStateType => {
  switch (action.type) {
    case usersActionType.FOLLOW_SUCCESS:
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload.userId ? { ...u, followed: true } : u,
        ),
      };
    case usersActionType.UNFOLLOW_SUCCESS:
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload.userId ? { ...u, followed: false } : u,
        ),
      };
    case usersActionType.SET_USERS:
    case usersActionType.SET_CURRENT_PAGE:
    case usersActionType.SET_TOTAL_MEMBERS:
    case usersActionType.SET_USERS_FILTER:
    case usersActionType.SET_FOLLOWINGS:
    case usersActionType.SET_FOLLOWINGS_COUNT:
      return {
        ...state,
        ...action.payload,
      };
    case usersActionType.TOGGLE_PRESSING_IN_PROGRESS:
      return {
        ...state,
        pressingInProgress: action.payload.isPressed
          ? [...state.pressingInProgress, action.payload.userId]
          : state.pressingInProgress.filter(id => id !== action.payload.userId),
      };
    case usersActionType.SET_FILTER_SEARCH_NAME:
    case usersActionType.SET_FILTER_USER_FRIEND:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    case usersActionType.RESET_USERS_DATA:
      return {
        ...state,
        users: [],
        currentPage: 1,
        totalCount: 0,
        filter: {
          ...state.filter,
          searchName: '',
          userFriends: showUsers.ALL,
        },
      };
    default:
      return state;
  }
};
