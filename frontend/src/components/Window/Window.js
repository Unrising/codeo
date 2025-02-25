import Draggable from 'react-draggable';
import React, { useRef } from 'react';
import './Window.css';

const Window = ({ title, children, onClose, x = 100, y = 100 }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{ x, y }}>
      <div className="window" ref={nodeRef}>
        <div className="window-header">
          <h2>{title}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
