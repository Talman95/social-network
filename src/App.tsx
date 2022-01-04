import React from 'react';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import './App.css';
import state from './redux/state';

function App() {
    let chats = state.sidebar.dialogs;
    let messages = state.messagesPage.messages;
  return (
    <div className="app">
        <Header />
        <div className='app_container'>
            <Sidebar chats={chats} />
            <Messages name={'Someone\'s Name'} status={'Online'} messages={messages}/>
        </div>
    </div>
  );
}

export default App;
