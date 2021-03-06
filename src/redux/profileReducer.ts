import {PhotosType, profileAPI, ProfileType, ProfileUpdateType, usersAPI} from "../api/api";
import {AppStateType, AppThunk} from "./store";
import {setAppErrorMessage} from "./appReducer";

export enum ActionsType {
    UPDATE_POST_MESSAGE = 'profile/UPDATE_POST_MESSAGE',
    ADD_POST = 'profile/ADD_POST',
    DELETE_POST = 'profile/DELETE_POST',
    SET_USER_PROFILE = 'profile/SET_USER_PROFILE',
    SET_PROFILE_STATUS = 'profile/SET_PROFILE_STATUS',
    SET_FRIENDSHIP = 'profile/SET_FRIENDSHIP',
    UPLOAD_USER_PHOTO_SUCCESS = 'profile/UPLOAD_USER_PHOTO_SUCCESS',
    UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS',
}

const initialState = {
    profile: null as ProfileType | null,
    posts: [
        {id: 4, message: 'Hi, how are you guys?', picture: ''},
        {
            id: 3,
            message: 'Yo yo yo!!!',
            picture: 'https://www.freecodecamp.org/news/content/images/size/w2000/2022/03/photo-1619410283995-43d9134e7656.jpeg'
        },
        {
            id: 2,
            message: 'My hometown',
            picture: 'https://img-cdn.tinkoffjournal.ru/i/n7_9ShaavMSV9O0eeTbqy1Z0udl7C-EcxHVE1uc-CXU/w:1200/aHR0cHM6Ly9pbWct/Y2RuLnRpbmtvZmZq/b3VybmFsLnJ1Ly0v/bWFpbl9fX19fc2h1/dHRlcnN0b2NrXzE0/OTk0MDEwMDEuaDBq/eXdxaWxtNDBoLmpw/Zw'
        },
        {
            id: 1,
            message: 'It\'s my first post! Hello everyone! Glad to see you here. Don\'t forget about the likes) Good luck!',
            picture: 'https://www.4vsar.ru/i/news/xxl/283806.jpg'
        }
    ] as PostType[],
    postMessage: '',
    status: '',
    isFriend: false,
}

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ActionsType.ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.postMessage,
                picture: ''
            };
            state = {...state, posts: [newPost, ...state.posts]};
            state.postMessage = '';
            return state;
        }
        case ActionsType.UPDATE_POST_MESSAGE: {
            state = {...state, postMessage: action.newMessage};
            return state;
        }
        case ActionsType.DELETE_POST: {
            state = {...state, posts: [...state.posts.filter(p => p.id !== action.postId)]};
            return state;
        }
        case ActionsType.SET_USER_PROFILE:
        case ActionsType.SET_PROFILE_STATUS:
        case ActionsType.SET_FRIENDSHIP:
            return {
                ...state,
                ...action.payload,
            }
        case ActionsType.UPLOAD_USER_PHOTO_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case ActionsType.UPDATE_PROFILE_SUCCESS:
            return {
                ...state, profile: {...state.profile, ...action.payload.updatedProfile} as ProfileType
            }
        default:
            return state;
    }
};

//actions
export const addPost = () => ({type: ActionsType.ADD_POST} as const)
export const updateMessage = (newMessage: string) => (
    {type: ActionsType.UPDATE_POST_MESSAGE, newMessage} as const
)
export const deletePost = (postId: number) => (
    {type: ActionsType.DELETE_POST, postId} as const
)
export const setUserProfile = (profile: ProfileType) => (
    {type: ActionsType.SET_USER_PROFILE, payload: {profile}} as const
)
export const setProfileStatus = (status: string) => (
    {type: ActionsType.SET_PROFILE_STATUS, payload: {status}} as const
)
export const setFriendship = (isFriend: boolean) => ({type: ActionsType.SET_FRIENDSHIP, payload: {isFriend}} as const)
export const uploadUserPhotoSuccess = (photos: PhotosType) => ({
    type: ActionsType.UPLOAD_USER_PHOTO_SUCCESS,
    photos,
} as const)
export const updateProfileSuccess = (updatedProfile: UpdateProfileModal) => ({
    type: ActionsType.UPDATE_PROFILE_SUCCESS,
    payload: {updatedProfile}
} as const)

//thunks
export const getUserProfile = (userId: number): AppThunk => {
    return async (dispatch) => {
        const response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getProfileStatus = (userId: number): AppThunk => {
    return async (dispatch) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setProfileStatus(response.data))
    }
}
export const updateProfileStatus = (status: string): AppThunk => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatus(status))
        }
    }
}
export const isFollow = (id: number): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const authId = getState().auth.id
            if (authId !== id) {
                const response = await usersAPI.isFollow(id)
                dispatch(setFriendship(response))
            }
        } catch (e: any) {

        }
    }
}
export const uploadUserPhoto = (userPhoto: File): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const res = await profileAPI.uploadPhoto(userPhoto)
            if (res.data.resultCode === 0) {
                dispatch(uploadUserPhotoSuccess(res.data.data.photos))
                console.log(res.data.data)
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorMessage(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorMessage('Some error occurred'))
                }
            }
        } catch (err: any) {
            dispatch(setAppErrorMessage(err.message))
        } finally {
            console.log(getState().profile.profile?.photos.large)
        }
    }
}
export const updateProfile = (profileData: UpdateProfileModal): AppThunk => {
    return async (dispatch, getState: () => AppStateType) => {
        try {
            const ownerId = getState().auth.id
            if (ownerId) {
                const updatedProfile = {...profileData, userId: ownerId}
                const res = await profileAPI.updateProfile(updatedProfile)
                if (res.data.resultCode === 0) {
                    dispatch(updateProfileSuccess(profileData))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorMessage(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorMessage('Some error occurred'))
                    }
                }
            }
        } catch (error: any) {
            dispatch(setAppErrorMessage(error.message))
        }
    }
}

//types
export type PostType = {
    id: number
    message: string
    picture: string
}
export type ProfileStateType = typeof initialState
export type UploadUserPhotoSuccessType = ReturnType<typeof uploadUserPhotoSuccess>
export type UpdateProfileSuccessType = ReturnType<typeof updateProfileSuccess>
export type UpdateProfileModal = {
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

export type ProfileActionsType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof updateMessage>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setProfileStatus>
    | ReturnType<typeof setFriendship>
    | UploadUserPhotoSuccessType
    | UpdateProfileSuccessType