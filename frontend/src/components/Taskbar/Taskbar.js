// src/components/Taskbar/Taskbar.js
import React from 'react';
import './Taskbar.css';

const Taskbar = ({ openWindows, setActiveWindow }) => {
  return (
    <div className="taskbar">
      <button>Start</button>
      <div className="taskbar-windows">
        {openWindows.map((window, index) => (
          <button key={index} onClick={() => setActiveWindow(window)}>
            {window}
          </button>
        ))}
      </div>
      <span className='clock'>{new Date().toLocaleTimeString()}</span>
    </div>
  );
};

export default Taskbar;