import React, {FC} from 'react';
import cl from './Messages.module.css';
import {ReduxStoreType} from "../../redux/store";
import {ChatContainer} from "./Chat/ChatContainer";
import {DialogsContainer} from "./Dialogs/DialogsContainer";

type PropsType = {
    store: ReduxStoreType
}

const Messages: FC<PropsType> = (props) => {

    return (
        <div className={cl.messages}>
            <DialogsContainer store={props.store}/>
            <ChatContainer store={props.store}/>
        </div>
    );
};

export default Messages;