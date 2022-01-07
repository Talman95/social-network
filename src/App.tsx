import React from 'react';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import './App.css';
import state from './redux/state';
import {Routes, Route} from 'react-router-dom';
import {Profile} from "./components/profile/Profile";

function App() {
    let chats = state.sidebar.dialogs;
    let messages = state.messagesPage.messages;
    return (
        <div className="app">
            <Header/>
            <div className='app_container'>
                <Sidebar chats={chats}/>
                <Routes>
                    <Route path={'/:id'} element={<Messages name={'Dmitrii Antonov'} status={'Online'} messages={messages}/>} />
                    <Route path={'/profile'} element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
