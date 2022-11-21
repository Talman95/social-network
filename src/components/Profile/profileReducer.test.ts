import {
  addPost,
  deletePost,
  PostType,
  profileReducer,
  ProfileStateType,
  setFriendship,
  setProfileStatus,
  setUserProfile,
  updateMessage,
  updateProfileSuccess,
  uploadUserPhotoSuccess,
} from '../../store/profileReducer';

let startState: ProfileStateType = {
  profile: null,
  posts: [] as PostType[],
  postMessage: '',
  status: '',
  isFriend: false,
  isLoad: true,
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
      { id: 4, message: 'Hi, how are you guys?', picture: '4' },
      { id: 3, message: 'Yo yo yo!!!', picture: '3' },
      { id: 2, message: 'My hometown', picture: '2' },
      { id: 1, message: "It's my first post! Hello everyone!", picture: '1' },
    ],
    postMessage: '',
    status: '',
    isFriend: false,
    isLoad: true,
  };
});

test('correct post should be added', () => {
  const endState = profileReducer(startState, addPost());

  const postsLength = 5;
  const firstElement = 0;

  expect(endState.posts.length).toBe(postsLength);
  expect(endState.posts[firstElement].id).toBeDefined();
  expect(endState.posts[firstElement].message).toBe(startState.postMessage);
  expect(endState.posts[firstElement].picture).toBe('');
});

test('correct message should be updated', () => {
  const endState = profileReducer(startState, updateMessage('Some user information'));

  expect(endState.postMessage).toBe('Some user information');
});

test('correct post should be removed', () => {
  const postId = 2;
  const expectedPostsLength = 3;
  const endState = profileReducer(startState, deletePost(postId));

  expect(endState.posts.length).toBe(expectedPostsLength);
  expect(endState.posts).toEqual([
    { id: 4, message: 'Hi, how are you guys?', picture: '4' },
    { id: 3, message: 'Yo yo yo!!!', picture: '3' },
    { id: 1, message: "It's my first post! Hello everyone!", picture: '1' },
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
