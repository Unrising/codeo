import Draggable from 'react-draggable';
import React, { useRef } from 'react';
import './Window.css';
import { AiOutlineClose } from "react-icons/ai"; // 📌 Importation de l'icône de fermeture

// Composant représentant une fenêtre déplaçable avec une barre de titre et un bouton de fermeture.
const Window = ({ title, children, onClose, x = 100, y = 100 }) => {
  const nodeRef = useRef(null); // Référence à l'élément DOM pour `react-draggable`

  return (
    // Fenêtre draggable (déplaçable) avec une barre de titre comme poignée de déplacement
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{ x, y }}>
      <div className="window" ref={nodeRef}>
        {/* En-tête de la fenêtre avec un titre et un bouton de fermeture */}
        <div className="window-header">
          <h2>{title}</h2>

          {/* Bouton de fermeture avec une icône React */}
          <button onClick={onClose} className="close-btn">
            <AiOutlineClose size={20} />
          </button>
        </div>

        {/* Contenu de la fenêtre (fourni via `children`) */}
        <div className="window-content">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
