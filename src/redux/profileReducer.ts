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
        {id: 4, message: 'Hi, how are you guys?', picture: ''},
        {id: 3, message: 'Yo yo yo!!!', picture: 'https://www.freecodecamp.org/news/content/images/size/w2000/2022/03/photo-1619410283995-43d9134e7656.jpeg'},
        {id: 2, message: 'My hometown', picture: 'https://img-cdn.tinkoffjournal.ru/i/n7_9ShaavMSV9O0eeTbqy1Z0udl7C-EcxHVE1uc-CXU/w:1200/aHR0cHM6Ly9pbWct/Y2RuLnRpbmtvZmZq/b3VybmFsLnJ1Ly0v/bWFpbl9fX19fc2h1/dHRlcnN0b2NrXzE0/OTk0MDEwMDEuaDBq/eXdxaWxtNDBoLmpw/Zw'},
        {id: 1, message: 'It\'s my first post! Hello everyone! Glad to see you here. Don\'t forget about the likes) Good luck!', picture: 'https://www.4vsar.ru/i/news/xxl/283806.jpg'}
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
    picture: string
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