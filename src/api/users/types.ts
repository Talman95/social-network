import {UserType} from "../../types/UserType";

export type GetUsersParamsType = {
    currentPage?: number
    pageSize?: number
    searchName?: string
    userFriends?: boolean | null
}
export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}