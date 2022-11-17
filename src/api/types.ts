export type ProfileType = {
    aboutMe: string
    contacts: ContactsType,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type PhotosType = {
    small: string,
    large: string
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
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
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    }
    aboutMe: string
}
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
export type DialogsType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        large: string
        small: string
    }
    userName: string
}