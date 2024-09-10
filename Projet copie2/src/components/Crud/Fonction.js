import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fonction() {

    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);

    const fonction = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Fonction/insertion_Fonction`, 
                { nom_fonction: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Fonction();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Fonction = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Fonction/selectAll_Fonction');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setFonctionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Fonction();
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
                        <h2>Ajouter Fonction</h2>
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
                    </div>
                    <div className="table-container">
                        <h3>Liste des Fonctions</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Fonction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(fonctionData) && fonctionData.length > 0 ? (
                                    fonctionData.map(fonction => (
                                        <tr key={fonction.id_fonction}>
                                            <td>{fonction.nom_fonction}</td>
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

export default Fonction;


