import React, { useState, useRef} from 'react';
import Draggable from 'react-draggable';
import './FolderIcon.css';
import { FcFolder } from "react-icons/fc";

const gridSize = 75;

/**
 * Vérifie si une position est occupée pour éviter la superposition.
 */
const isOverlapping = (x, y, existingPositions) => {
    return existingPositions.some(pos =>
        Math.abs(pos.x - x) < gridSize && Math.abs(pos.y - y) < gridSize
    );
};

/**
 * Trouve la prochaine position disponible pour éviter les superpositions.
 */
const getNextAvailablePosition = (x, y, existingPositions) => {
    while (isOverlapping(x, y, existingPositions)) {
        x += gridSize;
        if (x > window.innerWidth - gridSize) {
            x = 0;
            y += gridSize;
        }
    }
    return { x, y };
};

const FolderIcon = ({ name, onClick, existingPositions, setExistingPositions, x, y }) => {
    const nodeRef = useRef(null);
    const dragStartPosition = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    // Définition de la position initiale en utilisant les props ou en trouvant une position libre.
    const [position, setPosition] = useState(() => {
        const savedPosition = localStorage.getItem(`folder-${name}`);
        return savedPosition ? JSON.parse(savedPosition) : getNextAvailablePosition(x, y, existingPositions);
    });

    /**
     * Stocke la position de départ lors du début du déplacement.
     */
    const handleDragStart = (e, data) => {
        dragStartPosition.current = { x: data.x, y: data.y };
        isDragging.current = false; // Réinitialiser l'état de drag
    };

    /**
     * Vérifie la superposition et applique l'alignement sur la grille.
     */
    const handleDragStop = (e, data) => {
        let snappedX = Math.round(data.x / gridSize) * gridSize;
        let snappedY = Math.round(data.y / gridSize) * gridSize;

        // Vérifie la distance parcourue pour voir si c'est un clic ou un drag
        const dragDistance = Math.sqrt(
            Math.pow(data.x - dragStartPosition.current.x, 2) +
            Math.pow(data.y - dragStartPosition.current.y, 2)
        );

        if (dragDistance > 5) {
            isDragging.current = true; // Marque que c'était un vrai déplacement
        }

        // Vérifie si la nouvelle position est libre, sinon revient en arrière
        if (isOverlapping(snappedX, snappedY, existingPositions)) {
            setPosition(dragStartPosition.current); // Revenir à l'ancienne position si superposition
        } else {
            const newPosition = { x: snappedX, y: snappedY };
            setPosition(newPosition);
            localStorage.setItem(`folder-${name}`, JSON.stringify(newPosition));

            setExistingPositions(prev => [
                ...prev.filter(pos => pos.name !== name), 
                { name, ...newPosition }
            ]);
        }
    };

    /**
     * Ouvre la fenêtre **uniquement si ce n'était pas un déplacement**.
     */
    const handleClick = (e) => {
        e.stopPropagation(); // Empêche les événements de se propager
        if (!isDragging.current) {
            onClick(); // Ouvre la fenêtre **uniquement si ce n'est pas un déplacement**
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            position={position}
            onStart={handleDragStart}
            onStop={handleDragStop}
        >
            {/* Icône du dossier cliquable et déplaçable */}
            <div className="folder-icon" ref={nodeRef} onClickCapture={handleClick}>
                <FcFolder size={50} />
                <span className="folder-label">{name}</span>
            </div>
        </Draggable>
    );
};

export default FolderIcon;
