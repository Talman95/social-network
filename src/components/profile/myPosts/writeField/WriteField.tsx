import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import cl from "./WriteField.module.css";
import user from "../../../../assets/images/userLogo.png";
import {MyButton} from "../../../UI/button/MyButton";
import {Preloader} from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../../api/api";
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

type PropsType = {
    postMessage: string
    updateMessage: (newMessage: string) => void
    addPost: () => void
    profile: ProfileType | null
}

export const WriteField: FC<PropsType> = ({postMessage, updateMessage, addPost, profile}) => {

    const onUpdateMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateMessage(e.currentTarget.value)
    }
    const onAddPost = () => addPost()
    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            addPost()
        }
    }

    if (!profile) {
        return <Preloader/>
    }

    return (
        <Card sx={{margin: 1}}>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{bgcolor: "red"}}
                        aria-label="Field for write"
                        alt={profile.fullName}
                        src={profile.photos.small ? profile.photos.small : ''}
                    />
                }
                title={profile.fullName}
                subheader={profile.aboutMe}
            />
            <CardContent>
                <TextField
                    fullWidth
                    placeholder={"What's up"}
                    multiline
                    rows={4}
                    value={postMessage}
                    onChange={onUpdateMessage}
                />
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon/>}
                    sx={{marginRight: '10px'}}
                    onClick={onAddPost}
                >
                    Send
                </Button>
            </CardActions>
        </Card>
    );
};


// <div className={cl.write_post_container}>
//     <div className={cl.user_profile}>
//         <img src={profile.photos.small ? profile.photos.small : user} alt="user"/>
//         <div>
//             <p>{profile.fullName}</p>
//         </div>
//     </div>
//     <div className={cl.post_input_container}>
//         <textarea rows={5} placeholder={"How you doin?"}
//                   value={postMessage}
//                   onChange={onUpdateMessage}
//                   onKeyPress={onEnterPress}
//         />
//         <div className={cl.add_post_button}>
//             <MyButton callback={onAddPost}>
//                 Add a post
//             </MyButton>
//         </div>
//     </div>
// </div>