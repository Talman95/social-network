import ProfileReducer, {addPostAC, deletePostAC, updateMessageAC} from "./profile-reducer";
import MessagesReducer, {sendMessageAC, updateMessageBodyAC} from "./messages-reducer";


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
    _callSubscriber: (state: any) => void
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
    _callSubscriber(state: any) {
    },

    getState() {
        return this._state;
    },
    subscribe(observer: any) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionTypes) {
        this._state.profilePage = ProfileReducer(this._state.profilePage, action);
        this._state.messagesPage = MessagesReducer(this._state.messagesPage, action);

        this._callSubscriber(this._state);
    }
}

export type ActionTypes =
    ReturnType<typeof addPostAC> |
    ReturnType<typeof updateMessageAC> |
    ReturnType<typeof deletePostAC> |
    ReturnType<typeof sendMessageAC> |
    ReturnType<typeof updateMessageBodyAC>;

export default store;