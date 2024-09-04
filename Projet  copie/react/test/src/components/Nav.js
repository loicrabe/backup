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
                <li>
                    <a href="#" className="crud" onClick={toggleSubMenu}>CRUD</a>
                    {showSubMenu && (
                        <ul className="sub-menu">
                            <li><Link to="/fonction" className="sub-menu-item">Fonction</Link></li>
                            <li><Link to="/service" className="sub-menu-item">Service</Link></li>
                            <li><Link to="/lieu" className="sub-menu-item">Lieu</Link></li>
                            <li><Link to="/transmission" className="sub-menu-item">Transmission</Link></li>
                            <li><Link to="/energie" className="sub-menu-item">Energie</Link></li>
                            <li><Link to="/marque" className="sub-menu-item">Marque</Link></li>
                            <li><Link to="/model" className="sub-menu-item">Modèle</Link></li>
                            <li><Link to="/voiture" className="sub-menu-item">Voiture</Link></li>
                            <li><Link to="/role" className="sub-menu-item">Rôle</Link></li>
                            <li><Link to="/personnel" className="sub-menu-item">Personnel</Link></li>
                            <li><Link to="/utilisateur" className="sub-menu-item">Utilisateur</Link></li>
                            <li><Link to="/kilometrage" className="sub-menu-item">Kilométrage</Link></li>
                            <li><Link to="/maintenance" className="sub-menu-item">Maintenance</Link></li>
                            <li><Link to="/action" className="sub-menu-item">Action</Link></li>
                            <li><Link to="/demande-maintenance" className="sub-menu-item">Demande Maintenance</Link></li>
                            <li><Link to="/pv" className="sub-menu-item">PV</Link></li>
                            <li><Link to="/facture" className="sub-menu-item">Facture</Link></li>
                            <li><Link to="/recu" className="sub-menu-item">Reçu</Link></li>
                            <li><Link to="/reparation-voiture" className="sub-menu-item">Réparation Voiture</Link></li>
                            <li><Link to="/voiture-sur-cal" className="sub-menu-item">Voiture sur Cal</Link></li>
                            <li><Link to="/demande-pret-voiture" className="sub-menu-item">Demande Prêt Voiture</Link></li>
                        </ul>
                    )}
                </li>
                <li><Link to="/fonction" className="crud">Fonction</Link></li>
                <li><a href="#" className="dashboard" onClick={() => setShowSubMenu(false)}>Dashboard</a></li>
                <li><Link to="/demande-en-attente" className="demandes-hover">Demande en attentes</Link></li>
                <li><a href="#" className="constatation-hover" onClick={() => setShowSubMenu(false)}>Constatation Technique</a></li>
                <li><a href="#" className="marcher-hover" onClick={() => setShowSubMenu(false)}>Marcher</a></li>
                <li><a href="#" className="rendezvous-hover" onClick={() => setShowSubMenu(false)}>Rendez-vous Prise en Charge</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
