import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';
import '../styles/Form.css';
import '../styles/Crud.css';

function Entretien() {
    const user = localStorage.getItem('token');
    console.log(user);

    const [modele, setModele] = useState("");  
    const [data, setData] = useState('');
    const [remarqueData, setRemarqueData] = useState('');
    const [entretienData, setEntretienData] = useState([]);
    const [voitureData, setVoitureData] = useState([]);

    const insert_maintenance = async (event) => {
        event.preventDefault();
        console.log(data, remarqueData, user);
        try {
            const response = await axios.post(
                `http://localhost:8080/demande_maintenence/insertion_demande_maintenence`,
                { id_voiture: data, remarque: remarqueData, id_utilisateur: user },
                {
                    headers: { 'content-Type': 'application/json' },
                }
            );
            console.log('Insertion réussie:', response.data);
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Voiture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/voiture/selectAll_voiture');
            setVoitureData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des voitures', error);
        }
    };

    const selectAll_Entretien = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Action/selectAll_Action_byMaintence/1');
            setEntretienData(response.data.data);
            console.log(response.data.data); // Assurez-vous que les données sont bien reçues
        } catch (error) {
            console.error('Erreur de récupération des données d\'entretien', error);
        }
    };
    
    useEffect(() => {
        selectAll_Entretien();
    }, []);
    
    

    useEffect(() => {
        selectAll_Voiture();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-inline-container">
                        <h2>Envoyer une demande d'entretien</h2><br />
                        <form className="inline-form" onSubmit={insert_maintenance}>
                            <div className="form-group">
                                <label>ID Voiture:</label><br />
                                <select 
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}  // Update the state 'data'
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
                                <div className="checkbox-group">
                                    <h3>Demande de Diagnostic</h3>
                                    {entretienData
                                        .filter(action => action.type === 'Diagnostic')
                                        .map((action) => (
                                            <label key={action.id_action}>
                                                <input type="checkbox" /> {action.nom_action}
                                            </label>
                                        ))}
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <h3>Demande de Reparation</h3>
                                <label>
                                    <input type="checkbox" /> Pièce 1
                                </label><br />
                                <label>
                                    <input type="checkbox" /> Pièce 2
                                </label><br />
                                <label>
                                    <input type="checkbox" /> Pièce 3
                                </label>
                            </div>

                            <div className="checkbox-group">
                                <h3>Demande de Diagnostic</h3>
                                <label>
                                    <input type="checkbox" /> Service 1
                                </label><br />
                                <label>
                                    <input type="checkbox" /> Service 2
                                </label><br />
                                <label>
                                    <input type="checkbox" /> Service 3
                                </label>
                            </div>
                        </div><br />
                        <button className="insert-button">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Entretien;
