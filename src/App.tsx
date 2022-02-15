import React from 'react';
import Messages from "./components/Messages/Messages";
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {Nav} from "./components/Nav/Nav";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <Header/>
            <div className={'content'}>
                <Nav/>
                <Routes>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/messages'} element={<Messages/>}/>
                    <Route path={'/messages/:id'} element={<Messages/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
