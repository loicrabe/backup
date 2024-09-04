import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Crud.css';
import axios from 'axios';

function Crud() {
    const [activeForm, setActiveForm] = useState(null);
    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);
    const [showSublist, setShowSublist] = useState(false); 

    const handleFormDisplay = (formName) => {
        setActiveForm(formName);
    };

    const fonction = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Fonction/insertion_Fonction`, 
                { nom_fonction: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('ok', response.data);
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const fetchFonctionData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Fonction/selectAll_Fonction');
            setFonctionData(response.data);
            console.log(fonctionData);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        fetchFonctionData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Formulaire soumis avec succès!');
    };

    const toggleSublist = () => {
        setShowSublist(prev => !prev);
    };

    const renderTables = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Nom Fonction</th>
                    </tr>
                </thead>
                <tbody>
                {
                    Array.isArray(fonctionData) ? (
                        fonctionData.map(item => (
                            <tr key={item.id}>
                                <td>{item.nom_fonction}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td>Aucune donnée</td></tr>
                    )
                }
                </tbody>
            </table>
        );
    };

    const renderForm = () => {
        switch (activeForm) {
            case 'Fonction':
                return (
                    <>
                        <form onSubmit={fonction}>
                            <label>Nom Fonction:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Fonction"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                        {renderTables()}
                    </>
                );
            // Ajoutez les autres cas ici
            default:
                return null;
        }
    };

    return (
        <div className="crud-container">
            <header className="top-menu">
                <div className="top-menu-left">
                    <h1>Car Management</h1>
                </div>
                <div className="top-menu-right">
                    <Link to="/Crud" className="menu-item">Accueil</Link>
                    <Link to="/menu" className="menu-item">Menu</Link>
                    <a href="#" className="menu-item">Notifications</a>
                    <a href="#" className="menu-item">Déconnexion</a>
                </div>
            </header>
            <div className="main-content">
                <nav className="side-navbar">
                    <ul>
                        <li>
                            <a href="#" className="crud" onClick={toggleSublist}>CRUD</a>
                            {showSublist && (
                                <ul className="sublist">
                                    {[
                                        'Fonction', 'Service', 'Type de Lieu', 'Transmission', 'Energie',
                                        'Marque Voiture', 'Model Voiture', 'Voiture', 'Rôle', 'Personnel',
                                        'Utilisateur', 'Kilometrage', 'Maintenance', 'Action', 'PV',
                                        'Facture', 'Recu', 'Reparation Voiture', 'Demande Prêt Voiture'
                                    ].map((item, index) => (
                                        <li key={index}>
                                            <button onClick={() => handleFormDisplay(item)}>{item}</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li><a href="#" className="dashboard">Dashboard</a></li>
                        <li><a href="/Crud/fonction" className="demandes-hover">Demandes en attentes</a></li>
                        <li><a href="#" className="constatation-hover">Constatation Technique</a></li>
                        <li><a href="#" className="marcher-hover">Marché</a></li>
                        <li><a href="#" className="rendezvous-hover">Rendez-vous Prise en Charge</a></li>
                    </ul>
                </nav>
                <div className="content">
                    <div className="form-display">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Crud;
