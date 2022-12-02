import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { usersAPI } from '../../../api/users';
import { GetUsersResponseType } from '../../../api/users/types';
import { resultCode } from '../../../enums/resultCode';
import { ResponseType } from '../../../types/ResponseType';
import { convertParam } from '../../../utils/convertParam';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { setFriendship } from '../../actions/profileActions';
import {
  followSuccess,
  setFriends,
  setFriendsCount,
  setTotalMembers,
  setUsers,
  toggleIsFetching,
  unfollowSuccess,
} from '../../actions/usersActions';
import { RootState } from '../../store';

import { followUser, getFriends, getUsers, unfollowUser } from './actions';
import { sagaType } from './sagaType';

export function* getUsersWorker() {
  try {
    yield put(toggleIsFetching(true));
    const { currentPage, pageSize, filter } = yield select(state => state.users);

    const friend = convertParam.toBoolean(filter.userFriends);

    const params = {
      currentPage,
      pageSize,
      searchName: filter.searchName,
      userFriends: friend,
    };

    const res: GetUsersResponseType = yield call(usersAPI.getUsers, params);

    yield put(setUsers(res.items));
    yield put(setTotalMembers(res.totalCount));
    yield put(toggleIsFetching(false));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

export function* getFriendsWorker() {
  try {
    const isAuth: boolean = yield select((state: RootState) => state.auth.isAuth);

    if (isAuth) {
      const res: GetUsersResponseType = yield call(usersAPI.getUsers, {
        userFriends: true,
      });

      yield put(setFriends(res.items));
      yield put(setFriendsCount(res.totalCount));
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* followHelper(userId: number, page: string) {
  if (page === 'profile') {
    yield put(setFriendship(true));
  } else {
    yield put(followSuccess(userId));
  }
  yield put(getFriends());
}

function* followUserWorker(action: FollowUserActionType) {
  try {
    const res: ResponseType<{}> = yield call(usersAPI.follow, action.payload.userId);

    if (res.resultCode === resultCode.SUCCESS) {
      yield call(followHelper, action.payload.userId, action.payload.page);
    } else {
      showAppErrorHandler(res);
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* unfollowHelper(userId: number, page: string) {
  if (page === 'profile') {
    yield put(setFriendship(false));
  } else {
    yield put(unfollowSuccess(userId));
  }
  yield put(getFriends());
}

function* unfollowUserWorker(action: UnfollowUserActionType) {
  try {
    const res: ResponseType<{}> = yield call(usersAPI.unfollow, action.payload.userId);

    if (res.resultCode === resultCode.SUCCESS) {
      yield call(unfollowHelper, action.payload.userId, action.payload.page);
    } else {
      showAppErrorHandler(res);
    }
  } catch (e: any) {
    showNetworkErrorHandler(e);
  }
}

export function* usersWatcher() {
  yield takeLatest(sagaType.GET_USERS, getUsersWorker);
  yield takeEvery(sagaType.GET_FRIENDS, getFriendsWorker);
  yield takeLatest(sagaType.FOLLOW_USER, followUserWorker);
  yield takeLatest(sagaType.UNFOLLOW_USER, unfollowUserWorker);
}

type FollowUserActionType = ReturnType<typeof followUser>;
type UnfollowUserActionType = ReturnType<typeof unfollowUser>;

export type UsersSagasType =
  | ReturnType<typeof getUsers>
  | ReturnType<typeof getFriends>
  | FollowUserActionType
  | UnfollowUserActionType;
