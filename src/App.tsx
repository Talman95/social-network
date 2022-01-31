import React from 'react';
import Messages from "./components/Messages/Messages";
import './App.css';
import {StoreType} from './redux/state';
import {Route, Routes} from 'react-router-dom';
import {Profile} from "./components/Profile/Profile";
import {Nav} from "./components/Nav/Nav";
import {Header} from "./components/Header/Header";
import {Users} from "./components/Users/Users";

type AppPropsType = {
    store: StoreType
}

const App:React.FC<AppPropsType> = (props) => {
    let state = props.store.getState();
    return (
        <div className={'app'}>
            <Header/>
            <div className={'content'}>
                <Nav/>
                <Routes>
                    <Route path={'/profile'}
                           element={<Profile profilePage={state.profilePage}
                                             dispatch={props.store.dispatch.bind(props.store)}
                           />}
                    />
                    <Route path={'/messages'}
                           element={<Messages messagesPage={state.messagesPage}/>}
                    />
                    <Route path={'/messages/:id'}
                           element={<Messages messagesPage={state.messagesPage}/>}
                    />
                    <Route path={'/users'} element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
