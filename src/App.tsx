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
            <Sidebar />
            <Messages />
        </div>
    </div>
  );
}

export default App;
