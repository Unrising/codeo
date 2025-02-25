// src/App.js
import React from 'react';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import './index.css';
function App() {
  return (
    <div className='App'>
      <div className="App">
        <Desktop />
        <Taskbar />
      </div>
    </div>
  );
}

export default App;
