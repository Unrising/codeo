// src/components/Desktop/Desktop.js
import React, { useState } from 'react';
import './Desktop.css';
import FolderIcon from '../FolderIcon/FolderIcon';
import Window from '../Window/Window';

const Desktop = () => {
  const [openWindow, setOpenWindow] = useState(null);

  const handleIconClick = (name) => {
    if (!openWindows.includes(name)) {
      setOpenWindows([...openWindows, name]);
    }
  };
  
  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter(win => win !== name));
  };
  
  <Taskbar openWindows={openWindows} setActiveWindow={setOpenWindow} />
  
  return (
    <div className="desktop">
      <FolderIcon name="Projects" onClick={() => handleIconClick('Projects')} />
      <FolderIcon name="About Me" onClick={() => handleIconClick('About Me')} />
      <FolderIcon name="Contact" onClick={() => handleIconClick('Contact')} />

      {openWindow && (
        <Window title={openWindow} onClose={() => setOpenWindow(null)}>
          {/* Display dynamic content based on the window */}
          {openWindow === 'Projects' && <p>Here are my projects...</p>}
          {openWindow === 'About Me' && <p>About me content...</p>}
          {openWindow === 'Contact' && <p>Contact information...</p>}
        </Window>
      )}
    </div>
  );
};

export default Desktop;
