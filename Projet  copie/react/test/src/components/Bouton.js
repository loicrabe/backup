import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';

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
                        <button className="menu-button"><Link to="/voiture">Voiture</Link></button>
                        <button className="menu-button"><Link to="/role">Rôle</Link></button>
                        <button className="menu-button"><Link to="/personnel">Personnel</Link></button>
                        <button className="menu-button"><Link to="/utilisateur">Utilisateur</Link></button>
                        <button className="menu-button"><Link to="/kilometrage">Kilométrage</Link></button>
                        <button className="menu-button"><Link to="/maintenance">Maintenance</Link></button>
                        <button className="menu-button"><Link to="/action">Action</Link></button>
                        <button className="menu-button"><Link to="/demande-maintenance">Demande Maintenance</Link></button>
                        <button className="menu-button"><Link to="/pv">PV</Link></button>
                        <button className="menu-button"><Link to="/facture">Facture</Link></button>
                        <button className="menu-button"><Link to="/recu">Reçu</Link></button>
                        <button className="menu-button"><Link to="/reparation-voiture">Réparation Voiture</Link></button>
                        <button className="menu-button"><Link to="/voiture-sur-cal">Voiture sur Cal</Link></button>
                        <button className="menu-button"><Link to="/demande-pret-voiture">Demande Prêt Voiture</Link></button>
                    </div>
                </div>
    );
}

export default Bouton;
