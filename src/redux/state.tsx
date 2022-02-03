const UPDATE_POST_MESSAGE = 'UPDATE_POST_MESSAGE';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_MESSAGE_BODY = 'UPDATE_MESSAGE_BODY';

export type MessageType = {
    id: number
    name: string
    message: string
    time: string
}
export type DialogType = {
    id: number
    name: string
    lastMessage: string
    notice: number
    time: string
}
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
export type FollowingType = {
    id: number
    name: string
    status: string
    followed: boolean
}
export type MessagesPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    messageBody: string
}
export type ProfilePageType = {
    profile: ProfileType
    posts: PostType[]
    postMessage: string
}
export type RootStateType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}


export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionTypes) => void
}

let store: StoreType = {
    _state: {
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dmitrii Antonov', lastMessage: 'Hey. Do you have any props?', notice: 1, time: '12:33'},
                {id: 2, name: 'Mitya Bugaev', lastMessage: 'Let\'s get it started!', notice: 11, time: '00:19'},
                {id: 3, name: 'Dariya Bugaeva', lastMessage: 'Merry Christmas', notice: 2, time: '23:07'}
            ],
            messages: [
                {
                    id: 1,
                    name: 'Dmitrii Antonov',
                    message: 'Hello! How are you? When are you start to learn react?',
                    time: '22:22'
                },
                {
                    id: 2,
                    name: 'Dmitrii Antonov',
                    message: 'Hi! We will start after the new year. 3 january',
                    time: '22:24'
                },
                {id: 3, name: 'Dmitrii Antonov', message: 'Yo, cooool', time: '22:28'},
                {id: 4, name: 'Dmitrii Antonov', message: 'Yes, it\'s awesome!', time: '22:30'}
            ],
            messageBody: ''
        },
        profilePage: {
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
    },
    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: any) {
        if (action.type === ADD_POST) {
            let newPost = {
                id: new Date().getTime(),
                message: this.getState().profilePage.postMessage,
                likesCount: 0
            };
            this._state.profilePage.posts.unshift(newPost);
            this._state.profilePage.postMessage = '';
            this._callSubscriber();
        } else if (action.type === UPDATE_POST_MESSAGE) {
            this._state.profilePage.postMessage = action.postMessage;
            this._callSubscriber();
        } else if (action.type === DELETE_POST) {
            this._state.profilePage.posts = this._state.profilePage.posts.filter(p => p.id !== action.postId);
            this._callSubscriber();
        } else if (action.type === UPDATE_MESSAGE_BODY) {
            this._state.messagesPage.messageBody = action.newBody;
            this._callSubscriber();
        } else if (action.type === SEND_MESSAGE) {
            let newMessage = {
                id: new Date().getTime(),
                name: 'Dmitrii Antonov',
                message: this._state.messagesPage.messageBody,
                time: 'new time'
            }
            this._state.messagesPage.messages.push(newMessage);
            this._state.messagesPage.messageBody = '';
            this._callSubscriber();
        }
    }
}

export type ActionTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateMessageAC> |
    ReturnType<typeof deletePostAC> |
    ReturnType<typeof sendMessageAC> |
    ReturnType<typeof updateMessageBodyAC>;

export const addPostAC = () => ({type: 'ADD_POST'} as const);
export const updateMessageAC = (newMessage: string) => (
    {type: UPDATE_POST_MESSAGE, postMessage: newMessage} as const
);
export const deletePostAC = (postId: number) => (
    {type: DELETE_POST, postId: postId} as const
);
export const updateMessageBodyAC = (newBody: string) => ({type: UPDATE_MESSAGE_BODY, newBody});
export const sendMessageAC = () => ({type: SEND_MESSAGE} as const);

export default store;