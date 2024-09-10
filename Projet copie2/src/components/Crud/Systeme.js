import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Systeme() {

    const [data, setData] = useState('');
    const [systemeData, setSystemeData] = useState([]);

    // Fonction pour ajouter un nouveau système
    const addSysteme = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Systeme/insertion_Systeme`, 
                { nom_systeme: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Systeme();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur d\'insertion', error);
        }
    };

    // Fonction pour récupérer tous les systèmes
    const selectAll_Systeme = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Systeme/selecAll_Systeme');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setSystemeData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    // Utilisation de useEffect pour charger les données lors du premier rendu
    useEffect(() => {
        selectAll_Systeme();
        console.log("Set ", systemeData)
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Système</h2>
                        <form onSubmit={addSysteme}>
                            <label>Nom Système:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Système"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h3>Liste des Systèmes</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Système</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(systemeData) && systemeData.length > 0 ? (
                                    systemeData.map(systeme => (
                                        <tr key={systeme.id_systeme}>
                                            <td>{systeme.nom_systeme}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>Aucune donnée disponible</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Systeme;
