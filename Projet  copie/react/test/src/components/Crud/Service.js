import React, { useState, useEffect } from 'react';
import axios from 'axios';import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Service() {


    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);

    const service = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Service/insertion_Service`, 
                { nom_service: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Service();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Service = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Service/selectAll_service');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setFonctionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Service();
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
                            <h2>Ajouter Service</h2>
                            <form onSubmit={service}>
                                <label>Nom Service:</label>
                                <input
                                    type="text"
                                    placeholder="Insérer nom Service"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                                <button type="submit">Valider</button>
                            </form>
                            <div className="table-container">
                                <h3>Listes des Services</h3>
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Nom Service</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                {Array.isArray(fonctionData) && fonctionData.length > 0 ? (
                                    fonctionData.map(service => (
                                        <tr key={service.id_service}>
                                            <td>{service.nom_service}</td>
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

export default Service;
