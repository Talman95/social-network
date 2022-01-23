import React, {ChangeEvent, useState} from 'react';
import cl from "./WriteField.module.css";
import user from "../../../../assets/images/userLogo.png";
import {MyButton} from "../../../UI/button/MyButton";

type PropsType = {
    addPost: () => void
    postMessage: string
    updatePostMessage: (postMessage: string) => void
}

export const WriteField: React.FC<PropsType> = (props) => {
    // const [message, setMessage] = useState<string>(props.postMessage);
    // const onTextChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setMessage(e.currentTarget.value);
    // }

    const updateMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updatePostMessage(e.currentTarget.value);
    }

    const addPost = () => {
        props.addPost();
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
                <textarea rows={3} placeholder={"How you doin?"}
                          value={props.postMessage}
                          onChange={updateMessageHandler}
                />
                <div className={cl.add_post_button}>
                    <MyButton callback={() => addPost()}>Add a post</MyButton>
                </div>
            </div>
        </div>
    );
};