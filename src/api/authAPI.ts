import {instance} from "./api";
import {AuthMeDataType, ResponseType} from "./types";

export const authAPI = {
    async authMe() {
        const response = await instance.get<ResponseType<AuthMeDataType>>('auth/me')
        return response.data
    },
    async login(email: string, password: string, rememberMe: boolean, captcha: string) {
        const response = await instance.post<ResponseType<{ userId: number }>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha,
        })
        return response.data
    },
    async logout() {
        const response = await instance.delete<ResponseType<{}>>('auth/login')
        return response.data
    },
}