import React from 'react';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import './App.css';

function App() {
  return (
    <div className="app">
        <Header />
        <div className='app_container'>
            <Sidebar name={'Artyom Vasiliev'} lastMessage={'Let\'s get it started'} notice={11}/>
            <Messages name={'Someone\'s Name'} status={'Online'}/>
        </div>
    </div>
  );
}

export default App;
