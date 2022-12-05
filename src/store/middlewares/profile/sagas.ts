import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { profileAPI } from '../../../api/profile';
import { usersAPI } from '../../../api/users';
import { appStatus } from '../../../enums/appStatus';
import { resultCode } from '../../../enums/resultCode';
import { PhotosType } from '../../../types/PhotosType';
import { ProfileType } from '../../../types/ProfileType';
import { ResponseType } from '../../../types/ResponseType';
import {
  showAppErrorHandler,
  showNetworkErrorHandler,
} from '../../../utils/showAppMessageUtils';
import { setAppStatus } from '../../actions/appActions';
import {
  setFriendship,
  setProfileStatus,
  setUserProfile,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../actions/profileActions';
import { RootState } from '../../store';

import {
  getProfilePage,
  updateProfile,
  updateProfileStatus,
  uploadUserPhoto,
} from './actions';
import { sagaType } from './sagaType';

function* getUserProfileWorker(userId: number) {
  try {
    const res: ProfileType = yield call(profileAPI.getProfile, userId);
    yield put(setUserProfile(res));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* getProfileStatusWorker(userId: number) {
  try {
    const res: string = yield call(profileAPI.getStatus, userId);
    yield put(setProfileStatus(res));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* getUserIsFollowWorker(userId: number) {
  try {
    const res: boolean = yield call(usersAPI.isFollow, userId);
    yield put(setFriendship(res));
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

function* getProfilePageWorker(action: GetProfilePageActionType) {
  try {
    yield put(setAppStatus(appStatus.LOADING));
    yield all([
      call(getUserProfileWorker, action.payload.userId),
      call(getProfileStatusWorker, action.payload.userId),
      call(getUserIsFollowWorker, action.payload.userId),
    ]);
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  } finally {
    yield put(setAppStatus(appStatus.IDLE));
  }
}

function* updateProfileStatusWorker(action: UpdateProfileStatusActionType) {
  try {
    const res: ResponseType<{}> = yield call(
      profileAPI.updateStatus,
      action.payload.status,
    );

    if (res.resultCode === resultCode.SUCCESS) {
      yield put(setProfileStatus(action.payload.status));
    } else {
      yield call(showAppErrorHandler, res);
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
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
    } else {
      yield call(showAppErrorHandler, res);
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
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
      } else {
        yield call(showAppErrorHandler, res);
      }
    }
  } catch (e: any) {
    yield call(showNetworkErrorHandler, e);
  }
}

export function* profileWatcher() {
  yield takeEvery(sagaType.GET_PROFILE_PAGE, getProfilePageWorker);
  yield takeEvery(sagaType.UPDATE_PROFILE_STATUS, updateProfileStatusWorker);
  yield takeEvery(sagaType.UPLOAD_USER_PHOTO, uploadUserPhotoWorker);
  yield takeEvery(sagaType.UPDATE_PROFILE, updateUserWorker);
}

type GetProfilePageActionType = ReturnType<typeof getProfilePage>;
type UpdateProfileStatusActionType = ReturnType<typeof updateProfileStatus>;
type UploadUserPhotoActionType = ReturnType<typeof uploadUserPhoto>;
type UpdateProfileActionType = ReturnType<typeof updateProfile>;

export type ProfileSagasType =
  | GetProfilePageActionType
  | UpdateProfileStatusActionType
  | UploadUserPhotoActionType
  | UpdateProfileActionType;
