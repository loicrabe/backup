import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function TypeLieu() {

    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);

    const lieu = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/type_lieu/insertion_type_lieu`, 
                { nom_type_lieu: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Lieu();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Lieu = async () => {
        try {
            const response = await axios.get('http://localhost:8080/type_lieu/selectAll_type_lieu');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setFonctionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Lieu();
        console.log("Set ", fonctionData)
    }, []);





    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <Bouton />
                        <div className="form-container">
                            <h2>Ajouter Type de Lieu</h2>
                            <form onSubmit={lieu}>
                                <label>Nom Lieu:</label>
                                <input
                                    type="text"
                                    placeholder="Insérer nom Lieu"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                                <button type="submit">Valider</button>
                            </form>
                        </div>
                            <div className="table-container">
                                <h3>Listes des types de lieu</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nom TypeLieu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(fonctionData) && fonctionData.length > 0 ? (
                                            fonctionData.map(lieu => (
                                                <tr key={lieu.id_type_lieu}>
                                                    <td>{lieu.nom_type_lieu}</td>
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

export default TypeLieu;
