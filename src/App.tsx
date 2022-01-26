import React from 'react';
import Messages from "./components/Messages/Messages";
import './App.css';
import state, {addPost, updatePostMessage} from './redux/state';
import {Route, Routes} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {Nav} from "./components/Nav/Nav";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";

function App() {
    let profilePage = state.profilePage
    let messagesPage = state.messagesPage;
    return (
        <div className={'app'}>
            <Header/>
            <div className={'content'}>
                <Nav/>
                <Routes>
                    <Route path={'/profile'}
                           element={<Profile profilePage={profilePage}
                                             addPost={addPost}
                                             updatePostMessage={updatePostMessage}
                           />}
                    />
                    <Route path={'/messages'}
                           element={<Messages messagesPage={messagesPage}/>}
                    />
                    <Route path={'/messages/:id'}
                           element={<Messages messagesPage={messagesPage}/>}
                    />
                    <Route path={'/users'} element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
