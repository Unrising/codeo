// src/components/FolderIcons/FolderIcon.js
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import './FolderIcon.css';

const FolderIcon = ({ name, onClick }) => {
    const nodeRef = useRef(null);
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem(`folder-${name}`);
        return savedPosition ? JSON.parse(savedPosition) : { x: 50, y: 50 };
    });

    const handleDragStop = (e, data) => {
        setPosition({ x: data.x, y: data.y });
        localStorage.setItem(`folder-${name}`, JSON.stringify({ x: data.x, y: data.y }));
    };

    return (
        <Draggable nodeRef={nodeRef} defaultPosition={position} onStop={handleDragStop}>
            <div className='folder-icon' onDoubleClick={onClick} ref={nodeRef}>
                <img src="assets/components/FolderIcon/Simple/simple-64.png" alt={name} />
                <span>{name}</span>
            </div>
        </Draggable>
    );
};

export default FolderIcon;
