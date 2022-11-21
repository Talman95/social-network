import { connect } from 'react-redux';

import { DialogType } from '../../../store/messagesReducer';
import { AppStateType } from '../../../store/store';

import { Dialogs } from './Dialogs';

type MapStatePropsType = {
  dialogs: Array<DialogType>;
};

export type DialogsPropsType = MapStatePropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogs: state.messages.dialogs,
});

export const DialogsContainer = connect(mapStateToProps)(Dialogs);
