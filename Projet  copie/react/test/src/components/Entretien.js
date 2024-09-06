import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';
import '../styles/Form.css';
import '../styles/Crud.css';

function Entretien() {
    const user = localStorage.getItem('token');

    const [data, setData] = useState('');  // ID de la voiture
    const [remarqueData, setRemarqueData] = useState('');  // Remarque sur la maintenance
    const [maxIdMaintenance, setMaxIdMaintenance] = useState('');  // Max ID Maintenance
    const [diagnosticData, setDiagnosticData] = useState([]);  // Données de diagnostic
    const [entretienData, setEntretienData] = useState([]);  // Données d'entretien
    const [reparationData, setReparationData] = useState([]);  // Données de réparation
    const [voitureData, setVoitureData] = useState([]);  // Données des voitures
    const [selectedItems, setSelectedItems] = useState([]);  // Éléments sélectionnés (diagnostics, réparations, etc.)

    // Fonction pour insérer une demande de maintenance
    const insert_maintenance = async () => {
        console.log("id_Voiture : ",data,"Remarque : ",remarqueData,"user : ", user);
        try {
            const response = await axios.post(
                'http://localhost:8080/demande_maintenence/insertion_demande_maintenence',
                { id_voiture: data, remarque: remarqueData, id_utilisateur: user },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('Insertion de la maintenance réussie:', response.data);
            return response.data;  // Retourner la réponse pour permettre l'utilisation ultérieure
        } catch (error) {
            console.error('Erreur d\'insertion de la maintenance', error);
            throw error;
        }
    };

    // Fonction pour insérer la liste des actions de maintenance
    const insert_liste_maintenance = async () => {
        const formattedItems = selectedItems.map(item => ({
            id_demande_maintenence: maxIdMaintenance +1,
            id_action: item
        }));

        console.log("maintenance : ", formattedItems);
        try {
            const response = await axios.post(
                'http://localhost:8080/Liste_action_demande_maintenence/insertion_Liste_action_demande_maintenence_',
                formattedItems,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('Insertion de la liste d\'actions réussie:', response.data);
        } catch (error) {
            console.error('Erreur d\'insertion de la liste d\'actions', error);
        }
    };

    // Fonction pour insérer les deux actions ensemble
    const handleInsertAll = async (event) => {
        event.preventDefault();
        
        try {
            // Insérer la demande de maintenance
            await insert_maintenance();
            
            
            
            // Insérer la liste des actions de maintenance
            await insert_liste_maintenance();
            
            console.log('Les deux insertions ont été réussies');
        } catch (error) {
            console.error('Erreur lors de l\'insertion multiple', error);
        }
    };

    // Fonction pour mettre à jour les éléments sélectionnés
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedItems((prevItems) => [...prevItems, value]);
        } else {
            setSelectedItems((prevItems) => prevItems.filter((item) => item !== value));
        }
    };

    // Fonction pour récupérer toutes les voitures
    const selectAll_Voiture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/voiture/selectAll_voiture');
            setVoitureData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des voitures', error);
        }
    };

    const selectMax_Demande = async () => {
        try {
            const response = await axios.get('http://localhost:8080/demande_maintenence/selectMAx_demande_maintenence');
            const maxId = response.data.data.id_demande_maintenence;
            setMaxIdMaintenance(maxId);
            console.log(maxId);
        } catch (error) {
            console.error('Erreur de récupération du Max ID de la demande', error);
        }
    };
    

    // Fonction pour récupérer les diagnostics
    const selectAll_Diagnostic = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Action/selectAll_Action_byMaintence/1');
            setDiagnosticData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des diagnostics', error);
        }
    };

    // Fonction pour récupérer les entretiens
    const selectAll_Entretien = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Action/selectAll_Action_byMaintence/2');
            setEntretienData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des entretiens', error);
        }
    };

    // Fonction pour récupérer les réparations
    const selectAll_Reparation = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Action/selectAll_Action_byMaintence/3');
            setReparationData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des réparations', error);
        }
    };

    // Charger les données au montage du composant
    useEffect(() => {
        selectAll_Diagnostic();
        selectAll_Entretien();
        selectAll_Reparation();
        selectAll_Voiture();
        // Récupérer le Max ID Demande de Maintenance
        selectMax_Demande();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-inline-container">
                        <h2>Envoyer une demande d'entretien</h2><br />
                        <form className="inline-form" onSubmit={handleInsertAll}>
                            <div className="form-group">
                                <label>ID Voiture:</label><br />
                                <select 
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}  
                                    required
                                >
                                    <option value="">Choisir un Modèle</option>
                                    {voitureData.map((mod) => (
                                        <option key={mod.id_voiture} value={mod.id_voiture}>
                                            {mod.id_model.nom_model}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Remarque :</label><br />
                                <input
                                    type="text"
                                    placeholder="Insérer une remarque"
                                    value={remarqueData}
                                    onChange={(e) => setRemarqueData(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button className="insert-button">Insérer</button>
                            </div>
                        </form>
                        
                        <div className="checkbox-container">
                            <div className="checkbox-group">
                                <h3>Demande de Diagnostic</h3>
                                <div>
                                    {Array.isArray(diagnosticData) && diagnosticData.length > 0 ? (
                                        diagnosticData.map(fonction => (
                                            <div key={fonction.id_action}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`diagnostic-${fonction.id_action}`} 
                                                    value={fonction.id_action}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={`diagnostic-${fonction.id_action}`}>
                                                    {fonction.nom_action}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <h3>Demande de Réparation</h3>
                                <div>
                                    {Array.isArray(entretienData) && entretienData.length > 0 ? (
                                        entretienData.map(fonction => (
                                            <div key={fonction.id_action}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`entretien-${fonction.id_action}`} 
                                                    value={fonction.id_action}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={`entretien-${fonction.id_action}`}>
                                                    {fonction.nom_action}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <h3>Demande de Maintenance</h3>
                                <div>
                                    {Array.isArray(reparationData) && reparationData.length > 0 ? (
                                        reparationData.map(fonction => (
                                            <div key={fonction.id_action}>
                                                <input 
                                                    type="checkbox" 
                                                    id={`reparation-${fonction.id_action}`} 
                                                    value={fonction.id_action}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor={`reparation-${fonction.id_action}`}>
                                                    {fonction.nom_action}
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <button className="insert-button" onClick={handleInsertAll}>Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Entretien;
