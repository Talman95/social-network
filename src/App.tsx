import React from 'react';
import Messages from "./components/Messages/Messages";
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {Nav} from "./components/Nav/Nav";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";
import {ReduxStoreType} from "./redux/store";

type AppPropsType = {
    store: ReduxStoreType
}

const App: React.FC<AppPropsType> = (props) => {
    return (
        <div className={'app'}>
            <Header/>
            <div className={'content'}>
                <Nav/>
                <Routes>
                    <Route path={'/profile'}
                           element={<Profile store={props.store}/>}
                    />
                    <Route path={'/messages'}
                           element={<Messages store={props.store}/>}
                    />
                    <Route path={'/messages/:id'}
                           element={<Messages store={props.store}/>}
                    />
                    <Route path={'/users'} element={<Users/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
