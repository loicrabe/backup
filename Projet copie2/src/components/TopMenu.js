import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';  // Importation de l'icône de notification
import '../styles/Top.css';

function Top() {
    return (
        <header className="top-menu">
            <div className="top-menu-left">
                <h1>Car Management</h1>
            </div>
            <div className="top-menu-right">
                <Link to="/accueil" className="menu-item">Accueil</Link> 
                <a href="#" className="menu-item">Calendrier</a>
                <a href="#" className="menu-item">
                    <FaBell className="notification-icon" />  
                </a>
                <a href="#" className="menu-item">Deconnexion</a>
            </div>
        </header>
    );
}

export default Top;
