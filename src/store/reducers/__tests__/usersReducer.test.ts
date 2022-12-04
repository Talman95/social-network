import {
  followSuccess,
  setCurrentPage,
  setTotalMembers,
  setUsers,
  togglePressingInProgress,
  unfollowSuccess,
} from '../../actions/usersActions';
import { usersReducer, UsersStateType } from '../usersReducer';

let startState: UsersStateType = {
  users: [],
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  pressingInProgress: [],
  filter: {
    searchName: '',
    userFriends: 'all',
  },
  followings: [],
  followingsCount: 0,
};

beforeEach(() => {
  startState = {
    users: [
      {
        name: 'Dimych',
        id: 1,
        uniqueUrlName: null,
        photos: {
          small: 'small/1',
          large: 'large/1',
        },
        status: 'Hello',
        followed: true,
      },
      {
        name: 'Valera',
        id: 2,
        uniqueUrlName: null,
        photos: {
          small: 'small/4',
          large: 'large/4',
        },
        status: 'Coder',
        followed: false,
      },
    ],
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    pressingInProgress: [],
    filter: {
      searchName: '',
      userFriends: 'all',
    },
    followings: [],
    followingsCount: 0,
  };
});

test('user should be followed success', () => {
  const userId = 2;
  const secondElement = 1;

  const endState = usersReducer(startState, followSuccess(userId));

  expect(endState.users[secondElement].followed).toBe(true);
});

test('user should ne unfollowed success', () => {
  const userId = 1;
  const firstElement = 0;

  const endState = usersReducer(startState, unfollowSuccess(userId));

  expect(endState.users[firstElement].followed).toBe(false);
});

test('users should be set in state', () => {
  const expectUsersLength = 3;

  const users = [
    {
      name: 'Victor',
      id: 3,
      uniqueUrlName: null,
      photos: {
        small: 'small/3',
        large: 'large/3',
      },
      status: 'Hello',
      followed: true,
    },
    {
      name: 'Ignat',
      id: 4,
      uniqueUrlName: null,
      photos: {
        small: 'small/4',
        large: 'large/4',
      },
      status: 'Hello',
      followed: true,
    },
    {
      name: 'Igor',
      id: 5,
      uniqueUrlName: null,
      photos: {
        small: 'small/5',
        large: 'large/5',
      },
      status: 'Hello',
      followed: true,
    },
  ];
  const endState = usersReducer(startState, setUsers(users));

  expect(endState.users.length).toBe(expectUsersLength);
  expect(endState.users).toEqual(users);
});

test('new page should be set', () => {
  const page = 2;

  const endState = usersReducer(startState, setCurrentPage(page));

  expect(endState.currentPage).toBe(page);
});

test('should be set total users in state', () => {
  const totalCount = 777;

  const endState = usersReducer(startState, setTotalMembers(totalCount));

  expect(endState.totalCount).toBe(totalCount);
});

test('users should be in array while they are waiting and after deleted', () => {
  const count = 2;
  const startCountLength = 1;
  const firstElement = 0;
  const finishCountLength = 0;

  const endState = usersReducer(startState, togglePressingInProgress(true, count));

  expect(endState.pressingInProgress.length).toBe(startCountLength);
  expect(endState.pressingInProgress[firstElement]).toBe(count);

  const endState2 = usersReducer(startState, togglePressingInProgress(false, count));

  expect(endState2.pressingInProgress.length).toBe(finishCountLength);
});
