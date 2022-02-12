import React, {ChangeEvent, FC, KeyboardEvent} from 'react';
import cl from "./WriteField.module.css";
import user from "../../../../assets/images/userLogo.png";
import {MyButton} from "../../../UI/button/MyButton";

type PropsType = {
    postMessage: string
    updateMessage: (newMessage: string) => void
    addPost: () => void
}

export const WriteField: FC<PropsType> = (
    {
        postMessage, updateMessage, addPost
    }
) => {

    const onUpdateMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateMessage(e.currentTarget.value)
    }
    const onAddPost = () => addPost()
    const onEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            addPost()
        }
    }

    return (
        <div className={cl.write_post_container}>
            <div className={cl.user_profile}>
                <img src={user} alt="user"/>
                <div>
                    <p>Roman Talmanof</p>
                </div>
            </div>
            <div className={cl.post_input_container}>
                <textarea rows={5} placeholder={"How you doin?"}
                          value={postMessage}
                          onChange={onUpdateMessage}
                          onKeyPress={onEnterPress}
                />
                <div className={cl.add_post_button}>
                    <MyButton callback={onAddPost}>
                        Add a post
                    </MyButton>
                </div>
            </div>
        </div>
    );
};