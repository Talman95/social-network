import React from 'react';
import cl from './Messages.module.css';
import {Chat} from "./Chat/Chat";
import {Dialogs} from "./Dialogs/Dialogs";
import {MessagesPageType} from "../../redux/state";

type PropsType = {
    messagesPage: MessagesPageType
}

const Messages:React.FC<PropsType> = (props) => {
    // const [currentDialog, setCurrentDialog] = useState(false);

    return (
        <div className={cl.messages}>
            <Dialogs dialogs={props.messagesPage.dialogs}/>
            {/*{currentDialog ? <p>Empty Page</p> :*/}
            <Chat messages={props.messagesPage.messages} />
        </div>
    );
};

export default Messages;