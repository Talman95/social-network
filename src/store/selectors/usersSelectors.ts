import { showUsers } from '../../enums/showUsers';
import { UserType } from '../../types/UserType';
import { RootState } from '../store';

export const selectUsers = (state: RootState): UserType[] => state.users.users;

export const selectCurrentPage = (state: RootState): number => state.users.currentPage;
export const selectPageSize = (state: RootState): number => state.users.pageSize;
export const selectTotalCount = (state: RootState): number => state.users.totalCount;

export const selectPressingInProgress = (state: RootState): number[] =>
  state.users.pressingInProgress;

export const selectSearchName = (state: RootState): string =>
  state.users.filter.searchName;
export const selectUserFriends = (state: RootState): showUsers =>
  state.users.filter.userFriends;

export const selectFollowings = (state: RootState): UserType[] => state.users.followings;
export const selectFollowingsCount = (state: RootState): number =>
  state.users.followingsCount;
