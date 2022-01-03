import React from 'react';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Messages from "./components/messages/Messages";
import './App.css';

function App() {
    let chats = [
        {name: 'Dmitrii Antonov', lastMessage: 'Hey. Do you have any props?', notice: 1, date: '12:33'},
        {name: 'Artyom Vasiliev', lastMessage: 'Let\'s get it started!', notice: 11, date: '00:19'},
        {name: 'Dariya Bugaeva', lastMessage: 'Merry Christmas', notice: 2, date: '23:07'}
    ]
  return (
    <div className="app">
        <Header />
        <div className='app_container'>
            <Sidebar chats={chats} />
            <Messages name={'Someone\'s Name'} status={'Online'}/>
        </div>
    </div>
  );
}

export default App;
