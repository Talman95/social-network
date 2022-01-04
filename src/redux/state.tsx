export {}

type MessageType = {
    id: number
    body: string
    time: string
}
type DialogType = {
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
            {name: 'Dmitrii Antonov', lastMessage: 'Hey. Do you have any props?', notice: 1, time: '12:33'},
            {name: 'Artyom Vasiliev', lastMessage: 'Let\'s get it started!', notice: 11, time: '00:19'},
            {name: 'Dariya Bugaeva', lastMessage: 'Merry Christmas', notice: 2, time: '23:07'}
        ]
    },
    messagesPage: {
        messages: [
            {id: 1, body: 'Hello! How are you? When you start to learn react?', time: '22:22'},
            {id: 2, body: 'Hi! We will start after the new year. 3 january', time: '22:24'},
            {id: 3, body: 'Yo, cooool', time: '22:28'},
            {id: 4, body: 'Yes, it\'s awesome!', time: '22:30'}
        ]
    }
}

export default state;