import {profileAPI, ProfileType} from "../api/api";
import {AppThunk} from "./store";

export enum ActionsType {
    UPDATE_POST_MESSAGE = 'Profile/UPDATE_POST_MESSAGE',
    ADD_POST = 'Profile/ADD_POST',
    DELETE_POST = 'Profile/DELETE_POST',
    SET_USER_PROFILE = 'Profile/SET_USER_PROFILE',
    SET_PROFILE_STATUS = 'Profile/SET_PROFILE_STATUS',
}

const initialState: ProfileStateType = {
    profile: null,
    posts: [
        {id: 4, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Yo yo yo!!!', likesCount: 11},
        {id: 2, message: 'Hello everyone!', likesCount: 7},
        {id: 1, message: 'It\'s my first post', likesCount: 28}
    ],
    postMessage: '',
    profileStatus: '',
}

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case ActionsType.ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.postMessage,
                likesCount: 0
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
            return {
                ...state,
                ...action.payload,
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
export const setProfileStatus = (profileStatus: string) => (
    {type: ActionsType.SET_PROFILE_STATUS, payload: {profileStatus}} as const
)

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

//types
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileStateType = {
    profile: ProfileType | null
    posts: PostType[]
    postMessage: string
    profileStatus: string
}

export type ProfileActionsType =
    ReturnType<typeof addPost> | ReturnType<typeof updateMessage>
    | ReturnType<typeof deletePost> | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setProfileStatus>