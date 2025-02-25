import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Taskbar.css';

const Taskbar = ({ openWindows = []}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className="taskbar">
      <button>Start</button>
      
      <div className="taskbar-windows">
        {openWindows.map((window, index) => (
          <button key={index}>
            {window.name}
          </button>
        ))}
      </div>

      <div className="clock-container" onClick={() => setShowCalendar(!showCalendar)}>
        <span className="clock">{date.toLocaleTimeString()}</span>
        <span className="date">{date.toLocaleDateString()}</span>
      </div>

      {showCalendar && (
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
      )}
    </div>
  );
};

export default Taskbar;
