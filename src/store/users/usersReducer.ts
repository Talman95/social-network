import { UserType } from '../../types/UserType';

export enum ACTIONS_TYPE {
  FOLLOW_SUCCESS = 'Users/FOLLOW_SUCCESS',
  UNFOLLOW_SUCCESS = 'Users/UNFOLLOW_SUCCESS',
  SET_USERS = 'Users/SET_USERS',
  SET_CURRENT_PAGE = 'Users/SET_CURRENT_PAGE',
  SET_TOTAL_MEMBERS = 'Users/SET_TOTAL_MEMBERS',
  TOGGLE_IS_FETCHING = 'Users/TOGGLE_IS_FETCHING',
  TOGGLE_PRESSING_IN_PROGRESS = 'Users/TOGGLE_PRESSING_IN_PROGRESS',
  SET_USERS_FILTER = 'Users/SET_USERS_FILTER',
  SET_FOLLOWINGS = 'Users/SET_FOLLOWINGS',
  SET_FOLLOWINGS_COUNT = 'Users/SET_FOLLOWINGS_COUNT',
}

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

// actions
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

// types
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
