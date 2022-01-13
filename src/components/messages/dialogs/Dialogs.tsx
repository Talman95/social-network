import React from 'react';
import classes from './Dialogs.module.css';
import {MyInput} from "../../UI/input/MyInput";
import DialogItem from "./dialogItem/DialogItem";

type PropsType = {
    chats: Array<inArray>
}
type inArray = {
    id: number
    name: string
    lastMessage: string
    notice: number
    time: string
}

export const Dialogs: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.dialogs}>
            <MyInput/>
            <div className={classes.chats}>
                {props.chats.map(m => {
                    return (
                        <DialogItem name={m.name} lastMessage={m.lastMessage} notice={m.notice} date={m.time}
                                    id={m.id}/>
                    )
                })}
            </div>
        </div>
    );
};