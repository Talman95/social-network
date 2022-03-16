import React from 'react';
import Messages from "./components/Messages/Messages";
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Nav} from "./components/Nav/Nav";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <HeaderContainer/>
            <div className={'content'}>
                <Nav/>
                <Routes>
                    <Route path={'/profile'} element={<ProfileContainer/>}/>
                    <Route path={'/profile/:id'} element={<ProfileContainer/>}/>
                    <Route path={'/messages'} element={<Messages/>}/>
                    <Route path={'/messages/:id'} element={<Messages/>}/>
                    <Route path={'/users'} element={<UsersContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
