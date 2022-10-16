import React from 'react';
import {AppStateType} from "../../../redux/store";
import {Dialogs} from "./Dialogs";
import {DialogType} from "../../../redux/messagesReducer";
import {connect} from "react-redux";

type MapStatePropsType = {
    dialogs: Array<DialogType>
}

export type DialogsPropsType = MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.messages.dialogs
    }
}
export const DialogsContainer = connect(mapStateToProps)(Dialogs)