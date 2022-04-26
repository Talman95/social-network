import React, {useEffect} from 'react';
import './App.css';
import {Nav} from "./components/Nav/Nav";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AppRouter} from "./router/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {initializeApp} from "./redux/appReducer";
import {AppStateType} from "./redux/store";
import {Preloader} from "./components/common/Preloader/Preloader";

const App: React.FC = () => {
    const dispatch = useDispatch<Dispatch<any>>()
    const initialized = useSelector<AppStateType, boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className={'app'}>
            <HeaderContainer/>
            <div className={'content'}>
                <Nav/>
                <AppRouter/>
            </div>
        </div>
    );
}

export default App;
