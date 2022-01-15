import React from 'react';
import cl from './Dialogs.module.css';
import {MyInput} from "../../UI/input/MyInput";
import DialogItem from "./dialogItem/DialogItem";
import {DialogType} from "../../../redux/state";

type PropsType = {
    dialogs: DialogType[]
}

export const Dialogs: React.FC<PropsType> = (props) => {
    return (
        <div className={cl.dialogs}>
            <MyInput/>
            <div className={cl.chats}>
                {props.dialogs.map(d => {
                    return (
                        <DialogItem id={d.id}
                                    name={d.name}
                                    lastMessage={d.lastMessage}
                                    notice={d.notice}
                                    date={d.time}
                        />
                    )
                })}
            </div>
        </div>
    );
};