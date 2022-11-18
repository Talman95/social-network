import React from 'react';
import {AppStateType} from "../../../store/store";
import {Chat} from "./Chat";
import {MessageType, sendMessageAC, updateMessageBodyAC} from "../../../store/messagesReducer";
import {Dispatch} from "redux";
import {connect} from "react-redux";


export type MapStatePropsType = {
    messages: Array<MessageType>,
    messageBody: string
}
export type MapDispatchPropsType = {
    updateMessageBody: (newBody: string) => void,
    sendMessage: () => void
}

export type ChatPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: state.messages.messages,
        messageBody: state.messages.messageBody
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateMessageBody: (newBody: string) => {
            dispatch(updateMessageBodyAC(newBody))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}
export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)