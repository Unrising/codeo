// src/components/Desktop/Desktop.js
import React, { useState } from 'react';
import './Desktop.css';
import FolderIcon from '../FolderIcon/FolderIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]); 
  const [activeWindow, setActiveWindow] = useState(null);

  const handleIconClick = (name) => {
    if (!openWindows.includes(name)) {
      setOpenWindows([...openWindows, name]);
    }
    setActiveWindow(name);
  };

  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter(win => win !== name));
    if (activeWindow === name) {
      setActiveWindow(null);
    }
  };

  return (
    <div className="desktop">
      {/* Folder Icons */}
      <FolderIcon name="Projects" onClick={() => handleIconClick('Projects')} />
      <FolderIcon name="About Me" onClick={() => handleIconClick('About Me')} />
      <FolderIcon name="Contact" onClick={() => handleIconClick('Contact')} />

      {/* Open Windows */}
      {openWindows.map((win) => (
        <Window key={win} title={win} onClose={() => closeWindow(win)}>
          {win === 'Projects' && <p>Here are my projects...</p>}
          {win === 'About Me' && <p>About me content...</p>}
          {win === 'Contact' && <p>Contact information...</p>}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} setActiveWindow={setActiveWindow} />
    </div>
  );
};

export default Desktop;
