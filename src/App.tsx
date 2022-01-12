import React from 'react';
import Messages from "./components/messages/Messages";
import './App.css';
import state from './redux/state';
import {Routes, Route} from 'react-router-dom';
import {Profile} from "./components/profile/Profile";
import {Nav} from "./components/nav/Nav";
import {Header} from "./components/header/Header";

function App() {
    let chats = state.sidebar.dialogs;
    let messages = state.messagesPage.messages;
    return (
        <div className={'app'}>
            <Header />
                <Nav/>
                <Routes>
                    <Route path={'/'} element={<Profile/>}/>
                    <Route path={'/:id'} element={<Profile/>}/>
                    <Route path={'/messages'}
                           element={<Messages
                               name={'Dmitrii Antonov'} status={'Online'} messages={messages}/>
                           }
                    />
                </Routes>
        </div>
    );
}

export default App;
