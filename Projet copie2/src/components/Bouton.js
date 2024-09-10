import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Bouton.css';

function Bouton() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
                <div className="content">
                    <div className="button-container">
                        <button className="menu-button"><Link to="/fonction">Fonction</Link></button>
                        <button className="menu-button"><Link to="/service">Service</Link></button>
                        <button className="menu-button"><Link to="/lieu">Lieu</Link></button>
                        <button className="menu-button"><Link to="/transmission">Transmission</Link></button>
                        <button className="menu-button"><Link to="/energie">Energie</Link></button>
                        <button className="menu-button"><Link to="/marque">Marque</Link></button>
                        <button className="menu-button"><Link to="/model">Modèle</Link></button>
                        <button className="menu-button"><Link to="/role">Rôle</Link></button>
                        <button className="menu-button"><Link to="/maintenance">Entretien</Link></button>
                        <button className="menu-button"><Link to="/action">Action</Link></button>
                        <button className="menu-button"><Link to="/systeme">Systeme</Link></button>
                        <button className="menu-button"><Link to="/defaillance">Defaillance</Link></button>
                      </div>
                </div>
    );
}

export default Bouton;
