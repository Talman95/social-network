import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  MessageType,
  sendMessageAC,
  updateMessageBodyAC,
} from '../../../store/messagesReducer';
import { AppStateType } from '../../../store/store';

import { Chat } from './Chat';

export type MapStatePropsType = {
  messages: Array<MessageType>;
  messageBody: string;
};
export type MapDispatchPropsType = {
  updateMessageBody: (newBody: string) => void;
  sendMessage: () => void;
};

export type ChatPropsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  messages: state.messages.messages,
  messageBody: state.messages.messageBody,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => ({
  updateMessageBody: (newBody: string) => {
    dispatch(updateMessageBodyAC(newBody));
  },
  sendMessage: () => {
    dispatch(sendMessageAC());
  },
});

export const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);
