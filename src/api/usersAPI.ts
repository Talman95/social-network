import {instance, ResponseType} from "./api";

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
export type UserType = {
    name: string
    id: number
    uniqueUrlName: string | null
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
    followed: boolean
}

export const usersAPI = {
    async getUsers(params: GetUsersParamsType) {
        const response = await instance.get<GetUsersResponseType>(`users`, {
            params: {
                count: params.pageSize,
                page: params.currentPage,
                term: params.searchName,
                friend: params.userFriends,
            }
        })
        return response.data
    },
    async follow(userId: number) {
        const response = await instance.post<ResponseType<{}>>(`follow/${userId}`)
        return response.data
    },
    async unfollow(userId: number) {
        const response = await instance.delete<ResponseType<{}>>(`follow/${userId}`)
        return response.data
    },
    async getFriends() {
        const response = await instance.get<GetUsersResponseType>('users?friend=true')
        return response.data
    },
    async isFollow(userId: number) {
        const response = await instance.get<boolean>(`follow/${userId}`)
        return response.data
    },
}