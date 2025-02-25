// src/components/Taskbar/Taskbar.js
import React from 'react';
import './Taskbar.css';

const Taskbar = () => {
    return (
        <div className='taskbar'>
            <button>Start</button>
            <span className='clock'>12:00 PM</span>
        </div>
    );
};

export default Taskbar;