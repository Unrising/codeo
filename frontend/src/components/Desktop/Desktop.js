// src/components/Desktop/Desktop.js
import React, { useState } from 'react';
import './Desktop.css';
import FolderIcon from '../FolderIcon/FolderIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);

  const handleIconClick = (name) => {
    if (!openWindows.some(win => win.name === name)) {
      const centerX = window.innerWidth / 2 - 300; 
      const centerY = window.innerHeight / 2 - 200; 
      setOpenWindows([...openWindows, { name, x: centerX, y: centerY }]);
    }
  };

  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter(win => win.name !== name));
  };

  return (
    <div className="desktop">

      <FolderIcon name="Projects" onClick={() => handleIconClick('Projects')} />
      <FolderIcon name="About Me" onClick={() => handleIconClick('About Me')} />
      <FolderIcon name="Contact" onClick={() => handleIconClick('Contact')} />

      {openWindows.map((win) => (
        <Window key={win.name} title={win.name} x={win.x} y={win.y} onClose={() => closeWindow(win.name)}>
          {win.name === 'Projects' && <p>Here are my projects...</p>}
          {win.name === 'About Me' && <p>About me content...</p>}
          {win.name === 'Contact' && <p>Contact information...</p>}
        </Window>
      ))}

      <Taskbar openWindows={openWindows} />
    </div>
  );
};

export default Desktop;


