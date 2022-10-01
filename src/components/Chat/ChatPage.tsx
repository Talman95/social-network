import React, {FC, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";

export const ChatPage = () => {
    return (
        <Box sx={{height: '70vh'}}>
            <Chat/>
            <AddMessageBox/>
        </Box>
    )
}

export const Chat = () => {
    return (
        <Card sx={{margin: 1, padding: {sm: 2}}}>
            <ChatHeader/>
            <Messages/>
        </Card>
    )
}

type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const ChatHeader: FC = () => {
    return (
        <Box>
            <Typography variant={'h5'} component={'div'}
                        sx={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
                Developers Chat
            </Typography>
            <Divider/>
        </Box>
    )
}

export const Messages = () => {
    const [messages, setMessages] = useState<MessageType[]>([])

    return (
        <List sx={{width: '100%', bgcolor: 'background.paper', height: '400px', overflowY: 'auto'}}>
            {messages.map((m, i) =>
                <MessageItem message={m} key={i + m.userName}/>
            )}
        </List>
    )
}

export const MessageItem: FC<{ message: MessageType }> = ({message}) => {
    return (
        <ListItem alignItems={'flex-start'}>
            <ListItemAvatar>
                <Avatar alt={message.userName} src={message.photo}/>
            </ListItemAvatar>
            <ListItemText primary={message.userName} secondary={message.message}/>
        </ListItem>
    )
}

export const AddMessageBox = () => {
    const [text, setText] = useState('')

    return (
        <Card sx={{margin: 1, display: 'flex'}}>
            <TextField
                id={'Add-message-box'}
                placeholder={'Message...'}
                multiline
                rows={4}
                defaultValue={text}
                onChange={e => setText(e.currentTarget.value)}
                fullWidth
            />
            <Button variant={'contained'}>
                Send
            </Button>
        </Card>
    )
}