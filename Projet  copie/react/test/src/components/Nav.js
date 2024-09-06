import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

function Nav() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <nav className="side-navbar">
            <ul>
                {/* Bouton CRUD qui gère l'affichage du sous-menu */}
                
                <li><Link to="/crud" className="marcher-hover" >CRUD</Link></li>
                <li><Link to="/demande-entretien" className="marcher-hover" >Demande Entretien</Link></li>
                {/* <li><Link to="/fonction" className="crud">Fonction</Link></li> */}
                <li><Link to="/demande-en-attente" className="demandes-hover">Demande en attentes</Link></li>
                <li><a href="#" className="dashboard" onClick={() => setShowSubMenu(false)}>Dashboard</a></li>
                <li><a href="#" className="marcher-hover" onClick={() => setShowSubMenu(false)}>Marcher</a></li>
                <li><a href="#" className="rendezvous-hover" onClick={() => setShowSubMenu(false)}>Rendez-vous Prise en Charge</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
