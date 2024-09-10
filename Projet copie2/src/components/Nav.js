import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';  // Importation de l'icône pour le tableau de bord
import '../styles/Nav.css';

function Nav() {
    const location = useLocation(); // Pour obtenir la route actuelle
    const [activeLink, setActiveLink] = useState(location.pathname); // Stocker l'élément actif

    const handleLinkClick = (path) => {
        setActiveLink(path); // Met à jour l'élément actif
    };

    return (
        <nav className="side-navbar">
            <ul>
                <li>
                    <a 
                        href="#" 
                        className={`dashboard ${activeLink === '/dashboard' ? 'active-link' : ''}`} 
                        onClick={() => handleLinkClick('/dashboard')}
                    >
                        <FaTachometerAlt className="icon" /> {/* Ajout de l'icône */}
                        Dashboard
                    </a>
                </li>
                <li>
                    <Link 
                        to="/crud" 
                        className={`marcher-hover ${activeLink === '/crud' ? 'active-link' : ''}`}
                        onClick={() => handleLinkClick('/crud')}
                    >
                        CRUD
                    </Link>
                </li>

                <li>
                    <Link 
                        to="/demande-entretien" 
                        className={`marcher-hover ${activeLink === '/demande-entretien' ? 'active-link' : ''}`}
                        onClick={() => handleLinkClick('/demande-entretien')}
                    >
                        Demande Entretien
                    </Link>
                </li>

                <li>
                    <Link 
                        to="/demande-en-attente" 
                        className={`demandes-hover ${activeLink === '/demande-en-attente' ? 'active-link' : ''}`}
                        onClick={() => handleLinkClick('/demande-en-attente')}
                    >
                        Demande en attentes
                    </Link>
                </li>

                <li>
                    <Link 
                       to="/demande_valide"
                        className={`marcher-hover ${activeLink === '/demande_valide' ? 'active-link' : ''}`} 
                        onClick={() => handleLinkClick('/demande_valide')}
                    >
                        Demandes Valide
                    </Link>
                </li>

                <li>
                    <a 
                        href="#" 
                        className={`rendezvous-hover ${activeLink === '/rendezvous' ? 'active-link' : ''}`} 
                        onClick={() => handleLinkClick('/rendezvous')}
                    >
                        Rendez-vous Prise en Charge
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
