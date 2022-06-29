import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
    },
})

export const usersAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10) {
        const response = await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
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
        console.log(response.data)
        return response.data
    },
}

export const authAPI = {
    async authMe() {
        const response = await instance.get<ResponseType<AuthMeDataType>>('auth/me')
        return response.data
    },
    async login(email: string, password: string, rememberMe: boolean) {
        const response = await instance.post<ResponseType<{ userId: number }>>('auth/login', {
            email,
            password,
            rememberMe,
        })
        return response.data
    },
    async logout() {
        const response = await instance.delete<ResponseType<{}>>('auth/login')
        return response.data
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>('profile/status', {status})
    },
    updateProfile(profile: ProfileUpdateType) {
        return instance.put<ResponseType<{}>>('profile', {...profile})
    },
}

//types
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
export type ProfileType = {
    aboutMe: null | string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    fullName: string
    userId: number
    photos: {
        small: null | string
        large: null | string
    }
}
export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type ResponseType<D> = {
    data: D
    messages: Array<string>
    fieldsErrors: []
    resultCode: number
}
export type AuthMeDataType = {
    id: number
    login: string
    email: string
}
export type ProfileUpdateType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: null | string
        mainLink: null | string
    }
    aboutMe: string
}
