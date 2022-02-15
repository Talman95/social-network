const UPDATE_POST_MESSAGE = 'UPDATE_POST_MESSAGE';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfileType = {
    userId: number
    fullName: string
    photosLarge: string
}
export type ProfileStateType = {
    profile: ProfileType
    posts: PostType[]
    postMessage: string
}
export type ProfileActionTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateMessageAC> |
    ReturnType<typeof deletePostAC>;


const initialState: ProfileStateType = {
    profile: {
        userId: 2, fullName: 'Roman Talman', photosLarge: 'null'
    },
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
        default:
            return state;
    }
};

export const addPostAC = () => ({type: 'ADD_POST'} as const);
export const updateMessageAC = (newMessage: string) => (
    {type: UPDATE_POST_MESSAGE, newMessage} as const
);
export const deletePostAC = (postId: number) => (
    {type: DELETE_POST, postId: postId} as const
);