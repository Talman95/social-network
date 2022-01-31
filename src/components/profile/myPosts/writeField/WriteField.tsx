import React, {ChangeEvent, KeyboardEvent} from 'react';
import cl from "./WriteField.module.css";
import user from "../../../../assets/images/userLogo.png";
import {MyButton} from "../../../UI/button/MyButton";
import {ActionTypes, addPostAC, updateMessageAC} from "../../../../redux/state";

type PropsType = {
    postMessage: string
    dispatch: (action: ActionTypes) => void
}

export const WriteField: React.FC<PropsType> = (props) => {

    const onUpdateMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessage = e.currentTarget.value;
        props.dispatch(updateMessageAC(newMessage));
    }

    const onAddPostHandler = () => {
        props.dispatch(addPostAC());
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onAddPostHandler();
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
                          value={props.postMessage}
                          onChange={onUpdateMessageHandler}
                          onKeyPress={onEnterPressHandler}
                />
                <div className={cl.add_post_button}>
                    <MyButton callback={onAddPostHandler}>
                        Add a post
                    </MyButton>
                </div>
            </div>
        </div>
    );
};