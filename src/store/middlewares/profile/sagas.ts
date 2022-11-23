import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { profileAPI } from '../../../api/profile';
import { usersAPI } from '../../../api/users';
import { resultCode } from '../../../enums/resultCode';
import { PhotosType } from '../../../types/PhotosType';
import { ProfileType } from '../../../types/ProfileType';
import { ResponseType } from '../../../types/ResponseType';
import { setAppErrorMessage } from '../../actions/appActions';
import {
  setFriendship,
  setProfileLoad,
  setProfileStatus,
  setUserProfile,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../actions/profileActions';
import { followSuccess } from '../../actions/usersActions';
import { RootState } from '../../store';
import { getFriends } from '../users/sagas';

import {
  followUser,
  getProfilePage,
  unfollowUser,
  updateProfile,
  updateProfileStatus,
  uploadUserPhoto,
} from './actions';
import { sagaType } from './sagaType';

function* getUserProfileWorker(userId: number) {
  const res: ProfileType = yield call(profileAPI.getProfile, userId);
  yield put(setUserProfile(res));
}

function* getProfileStatusWorker(userId: number) {
  const res: string = yield call(profileAPI.getStatus, userId);
  yield put(setProfileStatus(res));
}

function* getUserIsFollowWorker(userId: number) {
  const res: boolean = yield call(usersAPI.isFollow, userId);
  yield put(setFriendship(res));
}

function* getProfilePageWorker(action: GetProfilePageActionType) {
  yield put(setProfileLoad(true));
  yield all([
    call(getUserProfileWorker, action.payload.userId),
    call(getProfileStatusWorker, action.payload.userId),
    call(getUserIsFollowWorker, action.payload.userId),
  ]);
  yield put(setProfileLoad(false));
}

function* updateProfileStatusWorker(action: UpdateProfileStatusActionType) {
  const res: ResponseType<{}> = yield call(
    profileAPI.updateStatus,
    action.payload.status,
  );

  if (res.resultCode === resultCode.SUCCESS) {
    yield put(setProfileStatus(action.payload.status));
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
  const res: ResponseType<{}> = yield call(usersAPI.follow, action.payload.userId);

  if (res.resultCode === resultCode.SUCCESS) {
    yield call(followHelper, action.payload.userId, action.payload.page);
  } else if (res.messages.length) {
    const firstElement = 0;
    yield put(setAppErrorMessage(res.messages[firstElement]));
  } else {
    yield put(setAppErrorMessage('Some error occurred'));
  }
}

function* unfollowHelper(userId: number, page: string) {
  if (page === 'profile') {
    yield put(setFriendship(false));
  } else {
    yield put(followSuccess(userId));
  }
  yield put(getFriends());
}

function* unfollowUserWorker(action: UnfollowUserActionType) {
  try {
    const res: ResponseType<{}> = yield call(usersAPI.unfollow, action.payload.userId);

    if (res.resultCode === resultCode.SUCCESS) {
      yield call(unfollowHelper, action.payload.userId, action.payload.page);
    }
  } catch (e: any) {
    yield put(setAppErrorMessage(e.message));
  }
}

function* uploadUserPhotoWorker(action: UploadUserPhotoActionType) {
  try {
    const res: ResponseType<{ photos: PhotosType }> = yield call(
      profileAPI.uploadPhoto,
      action.payload.userPhoto,
    );

    if (res.resultCode === resultCode.SUCCESS) {
      yield put(uploadUserPhotoSuccess(res.data.photos));
    } else if (res.messages.length) {
      const firstElement = 0;
      yield put(setAppErrorMessage(res.messages[firstElement]));
    } else {
      yield put(setAppErrorMessage('Some error occurred'));
    }
  } catch (e: any) {
    yield put(setAppErrorMessage(e.message));
  }
}

function* updateUserWorker(action: UpdateProfileActionType) {
  try {
    const id: number = yield select((state: RootState) => state.auth.id);

    if (id) {
      const updatedProfile = { ...action.payload.profile, userId: id };
      const res: ResponseType<{}> = yield call(profileAPI.updateProfile, updatedProfile);

      if (res.resultCode === resultCode.SUCCESS) {
        yield put(updateProfileSuccess(action.payload.profile));
      } else if (res.messages.length) {
        const firstElement = 0;
        yield put(setAppErrorMessage(res.messages[firstElement]));
      } else {
        yield put(setAppErrorMessage('Some error occurred'));
      }
    }
  } catch (error: any) {
    yield put(setAppErrorMessage(error.message));
  }
}

export function* profileWatcher() {
  yield takeEvery(sagaType.GET_PROFILE_PAGE, getProfilePageWorker);
  yield takeEvery(sagaType.UPDATE_PROFILE_STATUS, updateProfileStatusWorker);
  yield takeLatest(sagaType.FOLLOW_USER, followUserWorker);
  yield takeLatest(sagaType.UNFOLLOW_USER, unfollowUserWorker);
  yield takeEvery(sagaType.UPLOAD_USER_PHOTO, uploadUserPhotoWorker);
  yield takeEvery(sagaType.UPDATE_PROFILE, updateUserWorker);
}

type GetProfilePageActionType = ReturnType<typeof getProfilePage>;
type UpdateProfileStatusActionType = ReturnType<typeof updateProfileStatus>;
type FollowUserActionType = ReturnType<typeof followUser>;
type UnfollowUserActionType = ReturnType<typeof unfollowUser>;
type UploadUserPhotoActionType = ReturnType<typeof uploadUserPhoto>;
type UpdateProfileActionType = ReturnType<typeof updateProfile>;
