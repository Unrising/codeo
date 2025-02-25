// src/components/FolderIcons/FolderIcon.js
import React from 'react';
import './FolderIcon.css';

const FolderIcon = ({ name, onClick }) => {
    return (
      <div className='folder-icon' onClick={onClick} style={{ transform: 'scale(1.1)' }}>
        <img src="assets/components/FolderIcon/Simple/simple-64.png" alt={name} />
        <span>{name}</span>
      </div>
    );
  };

export default FolderIcon;