import {
  addPost,
  deletePost,
  setFriendship,
  setProfileStatus,
  setUserProfile,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../actions/profileActions';
import { PostType, profileReducer, ProfileStateType } from '../profileReducer';

let startState: ProfileStateType = {
  profile: null,
  posts: [] as PostType[],
  status: '',
  isFriend: false,
};

beforeEach(() => {
  startState = {
    profile: {
      aboutMe: 'Super dev',
      contacts: {
        facebook: '',
        website: '',
        vk: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
        mainLink: '',
      },
      lookingForAJob: false,
      lookingForAJobDescription: 'React, Redux',
      fullName: 'Roman',
      userId: 7777,
      photos: {
        small: 'photo/small/1',
        large: 'photo/large/1',
      },
    },
    posts: [
      { id: 4, message: 'Hi, how are you guys?' },
      { id: 3, message: 'Yo yo yo!!!' },
      { id: 2, message: 'My hometown' },
      { id: 1, message: "It's my first post! Hello everyone!" },
    ],
    status: '',
    isFriend: false,
  };
});

test('correct post should be added', () => {
  const message = 'hello';
  const endState = profileReducer(startState, addPost(message));

  const postsLength = 5;
  const firstElement = 0;

  expect(endState.posts.length).toBe(postsLength);
  expect(endState.posts[firstElement].id).toBeDefined();
  expect(endState.posts[firstElement].message).toBe(message);
});

test('correct post should be removed', () => {
  const postId = 2;
  const expectedPostsLength = 3;
  const endState = profileReducer(startState, deletePost(postId));

  expect(endState.posts.length).toBe(expectedPostsLength);
  expect(endState.posts).toEqual([
    { id: 4, message: 'Hi, how are you guys?' },
    { id: 3, message: 'Yo yo yo!!!' },
    { id: 1, message: "It's my first post! Hello everyone!" },
  ]);
});

test('correct profile should be setted', () => {
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

  const endState = profileReducer(startState, setUserProfile(profile));

  expect(endState.profile).toBeDefined();
  expect(endState.profile).toEqual(profile);
});

test('status should be set', () => {
  const endState = profileReducer(startState, setProfileStatus('React Redux'));

  expect(endState.status).toBe('React Redux');
});

test('current user should become friend', () => {
  const endState = profileReducer(startState, setFriendship(true));

  expect(endState.isFriend).toBe(true);
});

test('photo should be updated', () => {
  const photos = {
    small: 'photo/small/2',
    large: 'photo/large/2',
  };
  const endState = profileReducer(startState, uploadUserPhotoSuccess(photos));

  expect(endState.profile?.photos).toBe(photos);
});

test('profile should be updated', () => {
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

  const endState = profileReducer(startState, updateProfileSuccess(updatedProfile));

  expect(endState.profile).toEqual({
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
    userId: 7777,
    photos: {
      small: 'photo/small/1',
      large: 'photo/large/1',
    },
  });
});
