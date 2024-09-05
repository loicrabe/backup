import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Maintenance() {

    const [data, setData] = useState('');
    const [maintenanceData, setMaintenanceData] = useState([]);

    const maintenance = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Maintenance/insertion_Maintenance`, 
                { nom_maintenanca: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Maintenance();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Maintenance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Maintenance/selectAll_Maintenance');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setMaintenanceData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Maintenance();
        console.log("Set ", maintenanceData)
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Entretien</h2>
                        <form onSubmit={maintenance}>
                            <label>Nom Entretien:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Maintenance"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Listes Entretien</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Entretien</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(maintenanceData) && maintenanceData.length > 0 ? (
                                    maintenanceData.map(maintenance => (
                                        <tr key={maintenance.id_maintenance}>
                                            <td>{maintenance.nom_maintenanca}</td>
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

export default Maintenance;
