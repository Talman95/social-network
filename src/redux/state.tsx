export {}

type MessageType = {
    id: number
    name: string
    message: string
    time: string
}
type DialogType = {
    id: number
    name: string
    lastMessage: string
    notice: number
    time: string
}
type SidebarPropsType = {
    dialogs: Array<DialogType>
}
type MessagesPropsType = {
    messages: Array<MessageType>
}
type RootStateType = {
    sidebar: SidebarPropsType
    messagesPage: MessagesPropsType
}

let state: RootStateType = {
    sidebar: {
        dialogs: [
            {id: 1, name: 'Dmitrii Antonov', lastMessage: 'Hey. Do you have any props?', notice: 1, time: '12:33'},
            {id: 2, name: 'Mitya Bugaev', lastMessage: 'Let\'s get it started!', notice: 11, time: '00:19'},
            {id: 3, name: 'Dariya Bugaeva', lastMessage: 'Merry Christmas', notice: 2, time: '23:07'}
        ]
    },
    messagesPage: {
        messages: [
            {id: 1, name: 'Dmitrii Antonov', message: 'Hello! How are you? When are you start to learn react?', time: '22:22'},
            {id: 2, name: 'Dmitrii Antonov', message: 'Hi! We will start after the new year. 3 january', time: '22:24'},
            {id: 3, name: 'Dmitrii Antonov', message: 'Yo, cooool', time: '22:28'},
            {id: 4, name: 'Dmitrii Antonov', message: 'Yes, it\'s awesome!', time: '22:30'}
        ]
    }
}

export default state;