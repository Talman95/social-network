import React from 'react';
import Messages from "./components/messages/Messages";
import './App.css';
import state from './redux/state';
import {Routes, Route} from 'react-router-dom';
import {Profile} from "./components/profile/Profile";
import {Nav} from "./components/nav/Nav";
import {Header} from "./components/header/Header";
import {Sidebar} from "./components/sidebar/Sidebar";

function App() {
    let profilePage = state.profilePage
    let messagesPage = state.messagesPage;
    let sidebar = state.sidebar;
    return (
        <div className={'app'}>
            <Header/>
            <Nav/>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/:id'} element={<Profile/>}/>
                <Route path={'/messages'}
                       element={<Messages messagesPage={messagesPage}/>}
                />
                <Route path={'/messages/:id'}
                       element={<Messages messagesPage={messagesPage}/>}
                />
            </Routes>
            <Sidebar/>
        </div>
    );
}

export default App;
