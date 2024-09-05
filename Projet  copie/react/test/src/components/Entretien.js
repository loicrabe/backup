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

    const [data, setData] = useState('');  // ID de la voiture
    const [remarqueData, setRemarqueData] = useState('');  // Remarque sur la maintenance
    const [entretienData, setEntretienData] = useState([]);  // Données d'entretien (diagnostics)
    const [voitureData, setVoitureData] = useState([]);  // Données de voiture
    const [selectedItems, setSelectedItems] = useState([]);  // Éléments sélectionnés (diagnostics)

    // Fonction pour insérer une demande de maintenance
    const insert_maintenance = async (event) => {
        event.preventDefault();
        console.log(data, remarqueData, user);
        try {
            const response = await axios.post(
                `http://localhost:8080/demande_maintenence/insertion_demande_maintenence`,
                { id_voiture: data, remarque: remarqueData, id_utilisateur: user },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            console.log('Insertion réussie:', response.data);
        } catch (error) {
            console.error('Erreur de vérification', error);
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

    // Fonction pour récupérer les diagnostics
    const selectAll_Diagnostic = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Action/selectAll_Action_byMaintence/1');
            setEntretienData(response.data.data);
            console.log(response.data.data); // Vérifier si les données sont correctement reçues
        } catch (error) {
            console.error('Erreur de récupération des données d\'entretien', error);
        }
    };

    // Fonction pour gérer les changements de case à cocher
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;  // Récupérer la valeur de l'ID et l'état de la case
        setSelectedItems((prevState) =>
            checked 
            ? [...prevState, value]  // Ajouter l'ID si coché
            : prevState.filter((item) => item !== value)  // Retirer l'ID si décoché
        );
    };

    // Fonction pour soumettre les diagnostics sélectionnés
    const handleSubmit = async () => {
        try {
            const datas = selectedItems.map(item => ({
                id_demande_maintenence_valider: item,  // ou la valeur appropriée
                id_action: item  // Ajuster selon les besoins
            }));

            const response = await axios.post('http://localhost:8080/insertion_Liste_action_demande_maintenence_valider', datas);
            console.log('Réponse de l\'API:', response.data);
        } catch (error) {
            console.error('Erreur lors de l\'appel à l\'API:', error);
        }
    };

    // Charger les données des voitures et des diagnostics au montage du composant
    useEffect(() => {
        selectAll_Diagnostic();
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
                                {entretienData
                                    .filter(action => action.type === 'Diagnostic')
                                    .map((action) => (
                                        <label key={action.id_action}>
                                            <input
                                                type="checkbox"
                                                value={action.id_action}  // L'ID de l'action
                                                checked={selectedItems.includes(action.id_action)}  // Vérifie si l'élément est sélectionné
                                                onChange={handleCheckboxChange}  // Gère la case à cocher
                                            /> 
                                            {action.nom_action}
                                        </label>
                                    ))}
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
                        
                        <button className="insert-button" onClick={handleSubmit}>Valider</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Entretien;
