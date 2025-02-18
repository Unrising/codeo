// src/components/Window/Window.js
import React from 'react';
import './Window.css';

const Window = ({ title, children, onClose}) => {
    return (
        <div className='window-overlay'>
            <div className='window'>
                <div className='window-header'>
                    <h2>{title}</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <div className="window-content">{children}</div>
            </div>
        </div>
    );
};

export default Window;
