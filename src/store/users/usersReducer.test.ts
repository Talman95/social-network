import {
  followSuccess,
  setCurrentPage,
  setTotalMembers,
  setUsers,
  toggleIsFetching,
  togglePressingInProgress,
  unfollowSuccess,
  usersReducer,
  UsersStateType,
} from './usersReducer';

let startState: UsersStateType = {
  users: [],
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  isFetching: false,
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
    isFetching: false,
    pressingInProgress: [],
    filter: {
      searchName: '',
      userFriends: 'all',
    },
    followings: [],
    followingsCount: 0,
  };
});

/* eslint-disable */

test('user should be followed success', () => {
  const userId = 2;
  const endState = usersReducer(startState, followSuccess(userId));

  expect(endState.users[1].followed).toBe(true);
});

test('user should ne unfollowed success', () => {
  const endState = usersReducer(startState, unfollowSuccess(1));

  expect(endState.users[0].followed).toBe(false);
});

test('users should be set in state', () => {
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
  const expectUsersLength = 3;

  expect(endState.users.length).toBe(expectUsersLength);
  expect(endState.users).toEqual(users);
});

test('new page should be set', () => {
  const page = 2;
  const endState = usersReducer(startState, setCurrentPage(page));

  const number = 2;

  expect(endState.currentPage).toBe(number);
});

test('should be set total users in state', () => {
  const number = 777;
  const endState = usersReducer(startState, setTotalMembers(number));

  expect(endState.totalCount).toBe(number);
});

test('fetching should be toggle', () => {
  const endState = usersReducer(startState, toggleIsFetching(true));

  expect(endState.isFetching).toBe(true);
});

test('users should be in array while they are waiting and after deleted', () => {
  const number = 2;
  const endState = usersReducer(startState, togglePressingInProgress(true, number));

  expect(endState.pressingInProgress.length).toBe(1);
  expect(endState.pressingInProgress[0]).toBe(number);

  const endState2 = usersReducer(startState, togglePressingInProgress(false, number));

  expect(endState2.pressingInProgress.length).toBe(0);
});
