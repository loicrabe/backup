import React, { useState, useEffect } from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';
import axios from 'axios';

function MarqueVoiture() {
    const [data, setData] = useState('');
    const [marqueData, setMarqueData] = useState([]);

    const ajouterMarque = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Marque/insertion_Marque`, 
                { nom_marque: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_MarqueVoiture();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_MarqueVoiture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Marque/selectAll_Marque');
            console.log('Données récupérées:', response.data);
            setMarqueData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_MarqueVoiture();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Marque de Voiture</h2>
                        <form onSubmit={ajouterMarque}>
                            <label>Nom Marque:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Marque"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h3>Liste des Marques</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Marque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(marqueData) && marqueData.length > 0 ? (
                                    marqueData.map(marque => (
                                        <tr key={marque.id_marque}>
                                            <td>{marque.nom_marque}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">Aucune donnée disponible</td>
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

export default MarqueVoiture;
