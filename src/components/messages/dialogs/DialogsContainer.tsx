import React, {FC} from 'react';
import {ReduxStoreType} from "../../../redux/store";
import {Dialogs} from "./Dialogs";

type PropsType = {
    store: ReduxStoreType
}

export const DialogsContainer: FC<PropsType> = (props) => {
    const state = props.store.getState();
    return (
        <Dialogs dialogs={state.messages.dialogs}/>
    )
};