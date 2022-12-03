import {
  getCaptchaUrlSuccess,
  setCurrentUser,
  setUserData,
} from '../../actions/authActions';
import {
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../actions/profileActions';
import { authReducer, AuthStateType } from '../authReducer';

let startState: AuthStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  currentUser: null,
  captchaUrl: null,
};

beforeEach(() => {
  startState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    currentUser: null,
    captchaUrl: null,
  };
});

test('correct user data should be set', () => {
  const id = 123;
  const email = '123@gmail.com';
  const login = 'Roman';
  const isAuth = true;

  const endState = authReducer(startState, setUserData(id, email, login, isAuth));

  expect(endState.id).toBe(id);
  expect(endState.email).toBe(email);
  expect(endState.login).toBe(login);
  expect(endState.isAuth).toBe(isAuth);
});

test('correct auth user should be set', () => {
  const profile = {
    aboutMe: 'description',
    contacts: {
      facebook: 'facebook',
      website: 'website',
      vk: 'vk',
      twitter: 'twitter',
      instagram: 'instagram',
      youtube: 'youtube',
      github: 'github',
      mainLink: 'mainLink',
    },
    lookingForAJob: false,
    lookingForAJobDescription: 'looking for a job',
    fullName: 'Ivan Ivanov',
    userId: 123456,
    photos: {
      small: 'small',
      large: 'large',
    },
  };

  const endState = authReducer(startState, setCurrentUser(profile));

  expect(endState.currentUser).toBeDefined();
});

test('correct captcha url should be set', () => {
  const captchaUrl = 'captchaUrl';

  const endState = authReducer(startState, getCaptchaUrlSuccess(captchaUrl));

  expect(endState.captchaUrl).toBe(captchaUrl);
});

test('correct user photo should be updated', () => {
  const newPhotos = {
    small: 'new small',
    large: 'new large',
  };

  const endState = authReducer(startState, uploadUserPhotoSuccess(newPhotos));

  expect(endState.currentUser?.photos).toBeDefined();
  expect(endState.currentUser?.photos.small).toBe(newPhotos.small);
  expect(endState.currentUser?.photos.large).toBe(newPhotos.large);
});

test('correct auth user profile should be updated', () => {
  const updatedProfile = {
    lookingForAJob: true,
    lookingForAJobDescription: 'Не ищу а дурачусь',
    fullName: 'Roman Romanovich',
    contacts: {
      facebook: '',
      website: 'website/123',
      vk: 'vk/123',
      twitter: '',
      instagram: '',
      youtube: 'youtube/123',
      github: 'github/123',
      mainLink: '',
    },
    aboutMe: 'man',
  };

  const endState = authReducer(startState, updateProfileSuccess(updatedProfile));

  expect(endState.currentUser).toBeDefined();
  expect(endState.currentUser?.fullName).toBe(updatedProfile.fullName);
});
