import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Defaillance() {

    const [data, setData] = useState('');
    const [defaillanceData, setDefaillanceData] = useState([]);

    // Fonction pour ajouter une nouvelle défaillance
    const addDefaillance = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Defaillance/enregistrerDefaillance`, 
                { nom_defaillance: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Defaillance();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur d\'insertion', error);
        }
    };

    // Fonction pour récupérer toutes les défaillances
    const selectAll_Defaillance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Defaillance/selectAll_Defaillance');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setDefaillanceData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    // Utilisation de useEffect pour charger les données lors du premier rendu
    useEffect(() => {
        selectAll_Defaillance();
        console.log("Set ", defaillanceData)
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Défaillance</h2>
                        <form onSubmit={addDefaillance}>
                            <label>Nom Défaillance:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Défaillance"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h3>Liste des Défaillances</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Défaillance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(defaillanceData) && defaillanceData.length > 0 ? (
                                    defaillanceData.map(defaillance => (
                                        <tr key={defaillance.id_defaillance}>
                                            <td>{defaillance.nom_defaillance}</td>
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

export default Defaillance;
