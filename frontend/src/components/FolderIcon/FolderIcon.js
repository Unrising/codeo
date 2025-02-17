// src/components/FolderIcons/FolderIcon.js
import React from 'react';
import './FolderIcon.css';

const FolderIcon = ({ name }) => {
    return (
        <div className='folder-icon'>
            <img src="../../../assets/components/FolderIcon/Simple/simple-64.png" alt={name} />
            <span>{name}</span>
        </div>
    );
};

export default FolderIcon