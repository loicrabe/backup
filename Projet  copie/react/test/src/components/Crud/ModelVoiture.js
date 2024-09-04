import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function ModelVoiture() {
    const [data, setData] = useState(''); // Pour le nom du modèle
    const [marika, setMarika] = useState(''); // Pour l'ID de la marque sélectionnée
    const [marqueData, setMarqueData] = useState([]); // Pour stocker les marques récupérées
    const [modelData, setModelData] = useState([]); // Pour stocker les modèles de voitures récupérés

    const ajouterModel = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8080/model/insertion_Model`, 
                { nom_model: data, id_marque: marika }, 
                {
                    headers: {
                        'content-Type': 'application/json',
                    },
                }
            );
            console.log('Insertion réussie:', response.data);
            selectAll_ModelVoiture(); // Recharger les modèles après l'insertion
        } catch (error) {
            console.error('Erreur lors de l\'insertion du modèle', error);
        }
    };

    const selectAll_MarqueVoiture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Marque/selectAll_Marque');
            console.log('Données récupérées:', response.data);
            setMarqueData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des marques', error);
        }
    };

    const selectAll_ModelVoiture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/model/selectAll_Model');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setModelData(response.data.data);
            console.log(modelData) ;
        } catch (error) {
            console.error('Erreur de récupération des modèles', error);
        }
    };

    useEffect(() => {
        selectAll_MarqueVoiture();
        selectAll_ModelVoiture();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Modèle Voiture</h2>
                        <form onSubmit={ajouterModel}>
                            <label>Nom Modèle:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Modèle"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <label>ID Marque:</label>
                            <select 
                                value={marika}
                                onChange={(e) => setMarika(e.target.value)}
                                required
                            >
                               <option value="">Choisir une Marque</option>
                                {marqueData.map(marque => (
                                    <option key={marque.id_marque} value={marque.id_marque}>
                                        {marque.nom_marque}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Liste des Modèles de Voiture</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom Modèle</th>
                                    <th>Nom Marque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelData.map((model) => (
                                    <tr key={model.id_model}>
                                        <td>{model.id_model}</td>
                                        <td>{model.nom_model}</td>
                                        <td>{model.id_marque.nom_marque}</td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModelVoiture;
