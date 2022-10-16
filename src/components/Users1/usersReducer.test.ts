import {
    followSuccess,
    setCurrentPage, setTotalMembers,
    setUsers, toggleIsFetching, togglePressingInProgress,
    unfollowSuccess,
    usersReducer,
    UsersStateType
} from "../../redux/usersReducer";

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
}

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
    }
})

test("user should be followed success", () => {
    let endState = usersReducer(startState, followSuccess(2))

    expect(endState.users[1].followed).toBe(true)
})

test("user should ne unfollowed success", () => {
    let endState = usersReducer(startState, unfollowSuccess(1))

    expect(endState.users[0].followed).toBe(false)
})

test("users should be set in state", () => {
    const users = [
        {
            name: 'Victor', id: 3, uniqueUrlName: null, photos: {
                small: 'small/3', large: 'large/3',
            }, status: 'Hello', followed: true
        },
        {
            name: 'Ignat', id: 4, uniqueUrlName: null, photos: {
                small: 'small/4', large: 'large/4',
            }, status: 'Hello', followed: true
        },
        {
            name: 'Igor', id: 5, uniqueUrlName: null, photos: {
                small: 'small/5', large: 'large/5',
            }, status: 'Hello', followed: true
        }
    ]
    let endState = usersReducer(startState, setUsers(users))

    expect(endState.users.length).toBe(3)
    expect(endState.users).toEqual(users)
})

test("new page should be set", () => {
    let endState = usersReducer(startState, setCurrentPage(2))
    expect(endState.currentPage).toBe(2)
})

test("should be set total users in state", () => {
    let endState = usersReducer(startState, setTotalMembers(777))
    expect(endState.totalCount).toBe(777)
})

test("fetching should be toggle", () => {
    let endState = usersReducer(startState, toggleIsFetching(true))
    expect(endState.isFetching).toBe(true)
})

test("users should be in array while they are waiting and after deleted", () => {
    let endState = usersReducer(startState, togglePressingInProgress(true, 2))
    expect(endState.pressingInProgress.length).toBe(1)
    expect(endState.pressingInProgress[0]).toBe(2)

    let endState2 = usersReducer(startState, togglePressingInProgress(false, 2))
    expect(endState2.pressingInProgress.length).toBe(0)
})