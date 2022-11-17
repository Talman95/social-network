import {
    followSuccess,
    setTotalMembers,
    setUsers,
    toggleIsFetching,
    togglePressingInProgress,
    unfollowSuccess
} from "./usersReducer";
import {GetUsersResponseType, ResponseType} from "../../api/types";
import {usersAPI} from "../../api/usersAPI";
import {follow, getUsers, unfollow} from "./thunks";

jest.mock('../../api/api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
    usersAPIMock.getUsers.mockClear()
})

const usersResult: GetUsersResponseType = {
    items: [],
    totalCount: 10,
    error: null,
}
const result: ResponseType<{}> = {
    resultCode: 0,
    data: {},
    fieldsErrors: [],
    messages: [],
}

test('success get users thunk', async () => {
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(usersResult))
    const thunk = await getUsers()

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setUsers(usersResult.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, setTotalMembers(usersResult.totalCount))
})

test('success follow thunk', async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = await follow(2)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, togglePressingInProgress(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, togglePressingInProgress(false, 2))
})

test('success unfollow thunk', async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = await unfollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, togglePressingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, togglePressingInProgress(false, 1))
})