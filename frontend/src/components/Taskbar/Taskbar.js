import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Taskbar.css';

// Importation des icônes depuis react-icons
import { FcFolder, FcGlobe, FcBusinessContact } from "react-icons/fc";

const Taskbar = ({ openWindows = [], setOpenWindows }) => {
  const [showCalendar, setShowCalendar] = useState(false); // Affichage du calendrier
  const [date, setDate] = useState(new Date()); // Date et heure actuelles

  /**
   * Fonction pour mettre une fenêtre au premier plan.
   * @param {string} name - Nom de la fenêtre à mettre en avant.
   */
  const bringToFront = (name) => {
    setOpenWindows((prevWindows) => {
      const winIndex = prevWindows.findIndex(win => win.name === name);
      if (winIndex !== -1) {
        const newWindows = [...prevWindows];
        const [selectedWin] = newWindows.splice(winIndex, 1);
        newWindows.push(selectedWin);
        return newWindows;
      }
      return prevWindows;
    });
  };

  /**
   * Fonction pour ouvrir l'explorateur de fichiers "Documents".
   */
  const openExplorer = () => {
    if (!openWindows.some(win => win.name === "Documents")) {
      const centerX = window.innerWidth / 2 - 300;
      const centerY = window.innerHeight / 2 - 200;
      setOpenWindows([...openWindows, { name: "Documents", x: centerX, y: centerY }]);
    } else {
      bringToFront("Documents");
    }
  };

  /**
   * Met à jour l'heure et la date toutes les secondes.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      {/* Côté gauche de la barre des tâches : Bureau, Mail, Documents */}
      <div className="taskbar-left">
        {/* Bureau */}
        <button className="taskbar-icon">
          <FcGlobe size={28} title="Bureau" />
        </button>

        {/* Mail */}
        <button className="taskbar-icon">
          <FcBusinessContact size={28} title="Mail" />
        </button>

        {/* Explorer (Documents) */}
        <button className="taskbar-icon" onClick={openExplorer}>
          <FcFolder size={28} title="Documents" />
        </button>
      </div>

      {/* Affichage des fenêtres ouvertes dans la barre des tâches */}
      <div className="taskbar-windows">
        {openWindows.map((win) => (
          <button key={win.name} onClick={() => bringToFront(win.name)}>
            {win.name === "Documents" ? <FcFolder size={28} title="Documents" /> : win.name}
          </button>
        ))}
      </div>

      {/* Horloge et date (cliquable pour afficher le calendrier) */}
      <div className="clock-container" onClick={() => setShowCalendar(!showCalendar)}>
        <span className="clock">{date.toLocaleTimeString()}</span>
        <span className="date">{date.toLocaleDateString()}</span>
      </div>

      {/* Calendrier affiché lorsqu'on clique sur l'horloge */}
      {showCalendar && (
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
      )}
    </div>
  );
};

export default Taskbar;
