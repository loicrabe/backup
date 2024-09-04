import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Voiture() {
    const [immatriculation, setImmatriculation] = useState('');
    const [places, setPlaces] = useState('');
    const [fonction, setFonction] = useState('');
    const [transmission, setTransmission] = useState('');
    const [carburant, setCarburant] = useState('');
    const [service, setService] = useState('');
    const [modele, setModele] = useState('');

    const [fonctionData, setFonctionData] = useState([]);
    const [transmissionData, setTransmissionData] = useState([]);
    const [carburantData, setCarburantData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [modeleData, setModeleData] = useState([]);
    const [voitureData, setVoitureData] = useState([]);

    const ajouterVoiture = async (event) => {
        event.preventDefault();
        console.log(immatriculation,places ,fonction, transmission, carburant, service, modele);
        try {
            const response = await axios.post(
                'http://localhost:8080/voiture/insertion_voiture',
                {
                    matricule: immatriculation,
                    place: places,
                    id_fonction: fonction,
                    id_transmision: transmission,
                    id_energie: carburant,
                    id_service: service,
                    id_model: modele
                },
                {
                    headers: {
                        'content-Type': 'application/json',
                    },
                }
            );
            console.log('Insertion réussie:', response.data);
            selectAll_Voiture(); // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur lors de l\'insertion de la voiture', error);
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

    const selectAll_Transmision = async () => {
        try {
            const response = await axios.get('http://localhost:8080/transmision/selectAll_Transmision');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setTransmissionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    const selectAll_Carburant = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Energie/selectAll_Energie');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setCarburantData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    const selectAll_Service = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Service/selectAll_service');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setServiceData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    const selectAll_Modele= async () => {
        try {
            const response = await axios.get('http://localhost:8080/model/selectAll_Model');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setModeleData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des modèles', error);
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

    useEffect(() => {
        selectAll_Fonction();
        selectAll_Transmision();
        selectAll_Carburant();
        selectAll_Service();
        selectAll_Modele();
        selectAll_Voiture();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Voiture</h2>
                        <form onSubmit={ajouterVoiture}>
                            <label>Immatriculation:</label>
                            <input
                                type="text"
                                placeholder="Insérer Immatriculation"
                                value={immatriculation}
                                onChange={(e) => setImmatriculation(e.target.value)}
                                required
                            />
                            <label>Nombre de places:</label>
                            <input
                                type="number"
                                placeholder="Nombre de places"
                                value={places}
                                onChange={(e) => setPlaces(e.target.value)}
                                required
                            />
                            <label>Fonction:</label>
                            <select 
                                value={fonction}
                                onChange={(e) => setFonction(e.target.value)}
                                required
                            >
                                <option value="">Choisir une Fonction</option>
                                {fonctionData.map((func) => (
                                    <option key={func.id_fonction} value={func.id_fonction}>
                                        {func.nom_fonction}
                                    </option>
                                ))}
                            </select>
                            <label>Transmission:</label>
                            <select 
                                value={transmission}
                                onChange={(e) => setTransmission(e.target.value)}
                                required
                            >
                                <option value="">Choisir une Transmission</option>
                                {transmissionData.map((trans) => (
                                    <option key={trans.id_transmision} value={trans.id_transmision}>
                                        {trans.nom_transmission} 
                                    </option>
                                ))}
                            </select>
                            <label>Carburant:</label>
                            <select 
                                value={carburant}
                                onChange={(e) => setCarburant(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Carburant</option>
                                {carburantData.map((carb) => (
                                    <option key={carb.id_energie} value={carb.id_energie}>
                                        {carb.nom_energie}
                                    </option>
                                ))}
                            </select>
                            <label>Service:</label>
                            <select 
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Service</option>
                                {serviceData.map((serv) => (
                                    <option key={serv.id_service} value={serv.id_service}>
                                        {serv.nom_service}
                                    </option>
                                ))}
                            </select>
                            <label>Modèle:</label>
                            <select 
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Modèle</option>
                                {modeleData.map((mod) => (
                                    <option key={mod.id_model} value={mod.id_model}>
                                        {mod.nom_model}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Valider</button>
                        </form>
                    </div><br></br>
                    <div className="table-container">
                        <h2>Liste des Voitures</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Immatriculation</th>
                                    <th>Nombre de places</th>
                                    <th>Fonction</th>
                                    <th>Transmission</th>
                                    <th>Carburant</th>
                                    <th>Service</th>
                                    <th>Modèle</th>
                                    <th>Marque</th>
                                </tr>
                            </thead>
                            <tbody>
                                {voitureData.map((voiture) => (
                                    <tr key={voiture.id_voiture}>
                                        <td>{voiture.id_voiture}</td>
                                        <td>{voiture.matricule}</td>
                                        <td>{voiture.place}</td>
                                        <td>{voiture.id_fonction.nom_fonction}</td> {/* Afficher le nom de la fonction */}
                                        <td>{voiture.id_transmision.nom_transmission}</td> {/* Afficher le nom de la transmission */}
                                        <td>{voiture.id_energie.nom_energie}</td> {/* Afficher le nom du carburant */}
                                        <td>{voiture.id_service.nom_service}</td> {/* Afficher le nom du service */}
                                        <td>{voiture.id_model.nom_model}</td> {/* Afficher le nom du modèle */}                                    
                                        <td>{voiture.id_model.id_marque.nom_marque}</td> {/* Afficher le nom du modèle */}
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

export default Voiture;
