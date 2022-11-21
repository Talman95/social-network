import { UserType } from '../../types/UserType';
import { ACTIONS_TYPE } from '../actions/types/usersTypes';
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
    case ACTIONS_TYPE.FOLLOW_SUCCESS:
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.userID ? { ...u, followed: true } : u,
        ),
      };
    case ACTIONS_TYPE.UNFOLLOW_SUCCESS:
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.userID ? { ...u, followed: false } : u,
        ),
      };
    case ACTIONS_TYPE.SET_USERS:
    case ACTIONS_TYPE.SET_CURRENT_PAGE:
    case ACTIONS_TYPE.SET_TOTAL_MEMBERS:
    case ACTIONS_TYPE.TOGGLE_IS_FETCHING:
    case ACTIONS_TYPE.SET_USERS_FILTER:
    case ACTIONS_TYPE.SET_FOLLOWINGS:
    case ACTIONS_TYPE.SET_FOLLOWINGS_COUNT:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS_TYPE.TOGGLE_PRESSING_IN_PROGRESS:
      return {
        ...state,
        pressingInProgress: action.isPressed
          ? [...state.pressingInProgress, action.userId]
          : state.pressingInProgress.filter(id => id !== action.userId),
      };
    default:
      return state;
  }
};
