import React, { useState } from 'react';
import './FileExplorer.css';

// Importation des icônes depuis react-icons
import { AiFillFolder, AiFillCloseCircle } from "react-icons/ai";
import { FaDesktop } from "react-icons/fa";

const FileExplorer = ({ title, desktopFolders, onClose }) => {
    const [currentPath, setCurrentPath] = useState("Documents");

    return (
        <div className="file-explorer">
            {/* Barre de titre avec un bouton de fermeture */}
            <div className="file-explorer-header">
                <span>{title}</span>
                <button className="close-btn" onClick={onClose}>
                    <AiFillCloseCircle size={20} />
                </button>
            </div>

            {/* Barre de navigation affichant le dossier actuel */}
            <div className="file-explorer-nav">
                <span><AiFillFolder /> {currentPath}</span>
            </div>

            <div className="file-explorer-content">
                {/* Menu latéral pour naviguer entre différents dossiers */}
                <div className="sidebar">
                    <div className="folder-item" onClick={() => setCurrentPath("Documents")}>
                        <AiFillFolder /> Documents
                    </div>
                    <div className="folder-item" onClick={() => setCurrentPath("Bureau")}>
                        <FaDesktop /> Bureau
                    </div>
                </div>

                {/* Contenu principal affichant les dossiers sous forme d'icônes */}
                <div className="file-explorer-documents">
                    {desktopFolders.map((folder, index) => (
                        <div key={index} className="file-folder">
                            <AiFillFolder size={40} className="folder-icon-large" />
                            <span className="folder-name">{folder}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileExplorer;
