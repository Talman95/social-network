import { RootState } from '../store';

export const selectUsers = (state: RootState) => state.users.users;

export const selectCurrentPage = (state: RootState) => state.users.currentPage;
export const selectPageSize = (state: RootState) => state.users.pageSize;
export const selectTotalCount = (state: RootState) => state.users.totalCount;

export const selectIsFetching = (state: RootState) => state.users.isFetching;

export const selectPressingInProgress = (state: RootState) =>
  state.users.pressingInProgress;

export const selectSearchName = (state: RootState) => state.users.filter.searchName;
export const selectUserFriends = (state: RootState) => state.users.filter.userFriends;

export const selectFollowings = (state: RootState) => state.users.followings;
export const selectFollowingsCount = (state: RootState) => state.users.followingsCount;
