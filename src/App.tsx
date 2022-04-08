import React from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AppRouter} from "./router/AppRouter";

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <HeaderContainer/>
            <div className={'content'}>
                <Nav/>
                <AppRouter />
            </div>
        </div>
    );
}

export default App;
