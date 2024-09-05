import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Transmission() {

    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);

    const transmission = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/transmision/insertion_Transmision`, 
                { nom_transmission: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Transmision();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Transmision = async () => {
        try {
            const response = await axios.get('http://localhost:8080/transmision/selectAll_Transmision');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setFonctionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Transmision();
        console.log("Set ", fonctionData)
    }, []);



    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                <Bouton />
                    <div className="content-header">
                        <div className="form-container">
                            <h2>Ajouter Transmission</h2>
                            <form onSubmit={transmission}> 
                                <label>Nom Transmission:</label>
                                <input
                                    type="text"
                                    placeholder="Insérer nom Transmission"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                                <button type="submit">Valider</button>
                            </form>
                            <div className="table-container">
                                <h3>Listes des transmision</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nom Transmission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {Array.isArray(fonctionData) && fonctionData.length > 0 ? (
                                    fonctionData.map(transmission => (
                                        <tr key={transmission.id_transmision}>
                                            <td>{transmission.nom_transmission}</td>
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
            </div>
        </div>
    );
}

export default Transmission;
