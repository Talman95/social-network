import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bbb527b3-6bec-4c67-abf9-15d3ea5311d5'
    },
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
    }
}

export const authAPI = {
    authMe() {
        return instance.get('auth/me')
            .then(response => {
                return response.data
            })
    },
    login(email: string, password: string, rememberMe: boolean) {
      return instance.post('auth/login', {email, password, rememberMe})
          .then(res => {
              return res.data
          })
    },
    logout() {
        return instance.delete('auth/login')
            .then(res => {
                return res.data
            })
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get('profile/' + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
}

