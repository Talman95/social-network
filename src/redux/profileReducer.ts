const UPDATE_POST_MESSAGE = 'UPDATE_POST_MESSAGE';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: { small: string, large: string, }

}
export type ProfileStateType = {
    profile: ProfileType | null
    posts: PostType[]
    postMessage: string
}

export type ProfileActionTypes =
    ReturnType<typeof addPost>
    | ReturnType<typeof updateMessage>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof setUserProfile>

const initialState: ProfileStateType = {
    profile: null,
    posts: [
        {id: 4, message: 'Hi, how are you?', likesCount: 12},
        {id: 3, message: 'Yo yo yo!!!', likesCount: 11},
        {id: 2, message: 'Hello everyone!', likesCount: 7},
        {id: 1, message: 'It\'s my first post', likesCount: 28}
    ],
    postMessage: ''
}

export const profileReducer = (state = initialState, action: ProfileActionTypes): ProfileStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: new Date().getTime(),
                message: state.postMessage,
                likesCount: 0
            };
            state = {...state, posts: [newPost, ...state.posts]};
            state.postMessage = '';
            return state;
        }
        case UPDATE_POST_MESSAGE: {
            state = {...state, postMessage: action.newMessage};
            return state;
        }
        case DELETE_POST: {
            state = {...state, posts: [...state.posts.filter(p => p.id !== action.postId)]};
            return state;
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
};

export const addPost = () => ({type: ADD_POST} as const);
export const updateMessage = (newMessage: string) => (
    {type: UPDATE_POST_MESSAGE, newMessage} as const
);
export const deletePost = (postId: number) => (
    {type: DELETE_POST, postId} as const
);
export const setUserProfile = (profile: ProfileType) => (
    {type: SET_USER_PROFILE, profile} as const
);