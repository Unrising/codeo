import React, { useState, useEffect } from 'react';
import './Desktop.css';
import FolderIcon from '../FolderIcon/FolderIcon';
import Window from '../Window/Window';
import Taskbar from '../Taskbar/Taskbar';
import FileExplorer from '../FileExplorer/FileExplorer';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [existingPositions, setExistingPositions] = useState([]);

  const desktopFolders = ["Projects", "About Me", "Contact", "Notes", "2025", "Coding", "Data"];

  /**
   * Vérifie si une fenêtre chevauche une autre fenêtre existante.
   * @param {number} x - Position X de la nouvelle fenêtre.
   * @param {number} y - Position Y de la nouvelle fenêtre.
   * @returns {boolean} - Retourne `true` si la position est déjà occupée.
   */
  const isOverlapping = (x, y) => {
    return existingPositions.some(pos =>
      Math.abs(pos.x - x) < 300 && Math.abs(pos.y - y) < 200 // Taille approximative d'une fenêtre
    );
  };

  /**
   * Ouvre une nouvelle fenêtre en vérifiant si elle ne chevauche pas une autre.
   * @param {string} name - Nom de la fenêtre.
   */
  const handleIconClick = (name) => {
    if (!openWindows.some(win => win.name === name)) {
      let newX = window.innerWidth / 2 - 300;
      let newY = window.innerHeight / 2 - 200;

      // Vérifie si la position est libre, sinon repositionne
      while (isOverlapping(newX, newY)) {
        newX += 30; // Décale légèrement vers la droite
        if (newX > window.innerWidth - 300) {
          newX = 100; // Revient au début
          newY += 30; // Décale vers le bas
        }
      }

      setOpenWindows([...openWindows, { name, x: newX, y: newY }]);
      setExistingPositions([...existingPositions, { x: newX, y: newY }]);
    }
  };

  /**
   * Ferme une fenêtre et supprime sa position enregistrée.
   * @param {string} name - Nom de la fenêtre à fermer.
   */
  const closeWindow = (name) => {
    setOpenWindows(openWindows.filter(win => win.name !== name));
    setExistingPositions(existingPositions.filter(pos => pos.name !== name));
  };

  return (
    <div className="desktop">
      {desktopFolders.map((folder, index) => (
        <FolderIcon
          key={folder}
          name={folder}
          onClick={() => handleIconClick(folder)}
          existingPositions={existingPositions}
          setExistingPositions={setExistingPositions}
        />
      ))}

      {openWindows.map((win) => (
        <Window key={win.name} title={win.name} x={win.x} y={win.y} onClose={() => closeWindow(win.name)}>
          {win.name === "Documents" ? (
            <FileExplorer title="Documents" desktopFolders={desktopFolders} onClose={() => closeWindow("Documents")} />
          ) : (
            <p>Contenu de {win.name}...</p>
          )}
        </Window>
      ))}

      <Taskbar openWindows={openWindows} setOpenWindows={setOpenWindows} onOpenExplorer={() => handleIconClick("Documents")} />
    </div>
  );
};

export default Desktop;