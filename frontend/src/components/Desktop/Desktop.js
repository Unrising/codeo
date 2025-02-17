// src/components/Desktop/Desktop.js
import React from 'react';
import './Desktop.css';
import FolderIcon from '../FolderIcon/FolderIcon';

const Desktop = () => {
    return(
        <div className='desktop'>
            <FolderIcon name="Projects"/>
            <FolderIcon name="About Me"/>
            <FolderIcon name="Contacts"/>
        </div>
    );
};
export default Desktop;