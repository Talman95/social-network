import {instance} from "./api";
import {GetUsersParamsType, GetUsersResponseType, ResponseType} from "./types";

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
    async isFollow(userId: number) {
        const response = await instance.get<boolean>(`follow/${userId}`)
        return response.data
    },
}