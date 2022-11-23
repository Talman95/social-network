import { UserType } from '../../types/UserType';
import { usersActionType } from '../actions/types/usersTypes';
import {
  followSuccess,
  setCurrentPage,
  setFriends,
  setFriendsCount,
  setTotalMembers,
  setUsers,
  setUsersFilter,
  toggleIsFetching,
  togglePressingInProgress,
  unfollowSuccess,
} from '../actions/usersActions';

export const initialState = {
  users: [] as Array<UserType>,
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  isFetching: false,
  pressingInProgress: [] as Array<number>,
  filter: {
    searchName: '',
    userFriends: 'all',
  } as UsersFilterType,
  followings: [] as UserType[],
  followingsCount: 0,
};

export type UsersStateType = typeof initialState;
export type UsersFilterType = {
  searchName: string;
  userFriends: FriendUiType;
};
export type FriendUiType = 'all' | 'follow' | 'unfollow';
export type UsersActionsType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalMembers>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof togglePressingInProgress>
  | ReturnType<typeof setUsersFilter>
  | ReturnType<typeof setFriends>
  | ReturnType<typeof setFriendsCount>;

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
    case usersActionType.TOGGLE_IS_FETCHING:
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
    default:
      return state;
  }
};
