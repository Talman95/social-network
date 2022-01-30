import React, {ChangeEvent} from 'react';
import cl from "./WriteField.module.css";
import user from "../../../../assets/images/userLogo.png";
import {MyButton} from "../../../UI/button/MyButton";
import {addPostActionCreator, updateMessageActionCreator} from "../../../../redux/state";

type PropsType = {
    postMessage: string
    dispatch: any
}

export const WriteField: React.FC<PropsType> = (props) => {

    const onUpdateMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newMessage = e.currentTarget.value;
        props.dispatch(updateMessageActionCreator(newMessage));
    }

    const onAddPostHandler = () => {
        props.dispatch(addPostActionCreator());
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
                          onChange={onUpdateMessageHandler}
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