import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';


function DemandeAttente() {

    const [ActionMaintData, setActionMaintData] = useState([]);


    // const insert_valider = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post(`http://localhost:8080/demande_maintenence_valider/insertion_demande_maintenence_validation`, 
    //             { nom_fonction: data, remarque: data, date_rdv: data,  date_rdv: data }, {
    //             headers: {
    //                 'content-Type': 'application/json',
    //             },
    //         });
    //         console.log('Insertion réussie:', response.data);
    //         selectAll_Fonction();  // Recharger les données après l'insertion
    //     } catch (error) {
    //         console.error('Erreur de Verification', error);
    //     }
    // };

    const selectAll_Action_Maintenance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/demande_maintenence/selectAll_demande_maintenence');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setActionMaintData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Action_Maintenance();
        console.log("Set ", ActionMaintData)
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="content-header">
                        <h2>Welcome to the Menu Page</h2>
                        <button className="insert-vehicle-button">Insérer véhicule</button>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Immatricule</th>
                                    <th>Nom  </th>
                                    <th>Service</th>
                                    <th>Fonction</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray(ActionMaintData) && ActionMaintData.length > 0 ? (
                                    ActionMaintData.map(fonction => (
                                        <tr key={fonction.id_demande_maintenence}>
                                            <td>{fonction.id_demande_maintenence}</td>
                                            <td>{fonction.id_voiture.matricule}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.nom}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.id_service.nom_service}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.id_fonction.nom_fonction}</td>
                                            <td>
                                                <i className="fas fa-check-circle action-icon validate-icon" title="Valider" onClick={() => {/* Logique pour valider */}}></i>
                                                <i>Valider</i>
                                            </td>
                                            <td>
                                                <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter" onClick={() => {/* Logique pour rejeter */}}></i>
                                                <i>Rejeter</i>
                                            </td>
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

export default DemandeAttente;
