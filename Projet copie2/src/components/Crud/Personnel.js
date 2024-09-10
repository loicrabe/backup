import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Personnel() {
    const [nomPersonnel, setNomPersonnel] = useState('');
    const [matricule, setMatricule] = useState('');
    const [fonction, setFonction] = useState('');
    const [service, setService] = useState('');

    const [fonctionData, setFonctionData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [personnelData, setPersonnelData] = useState([]);

    const ajouterPersonnel = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/personnel/insertion_personnel',
                {
                    nom: nomPersonnel,
                    matricule: matricule,
                    id_fonction: fonction,
                    id_service: service
                },
                {
                    headers: {
                        'content-Type': 'application/json',
                    },
                }
            );
            console.log('Insertion réussie:', response.data);
            selectAll_Personnel(); // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur lors de l\'insertion du personnel', error);
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

    const selectAll_Service = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Service/selectAll_service');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setServiceData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    const selectAll_Personnel = async () => {
        try {
            const response = await axios.get('http://localhost:8080/personnel/selectAll_personnel');
            setPersonnelData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des personnels', error);
        }
    };

    useEffect(() => {
        selectAll_Fonction();
        selectAll_Service();
        selectAll_Personnel();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Personnel</h2>
                        <form onSubmit={ajouterPersonnel}>
                            <label>Nom Personnel:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Personnel"
                                value={nomPersonnel}
                                onChange={(e) => setNomPersonnel(e.target.value)}
                                required
                            />
                            <label>Matricule:</label>
                            <input
                                type="text"
                                placeholder="Insérer Matricule"
                                value={matricule}
                                onChange={(e) => setMatricule(e.target.value)}
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
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Liste du Personnel</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom Personnel</th>
                                    <th>Matricule</th>
                                    <th>Fonction</th>
                                    <th>Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personnelData.map((personnel) => (
                                    <tr key={personnel.id_personnel}>
                                        <td>{personnel.id_personnel}</td>
                                        <td>{personnel.nom}</td>
                                        <td>{personnel.matricule}</td>
                                        <td>{personnel.id_fonction.nom_fonction}</td> {/* Afficher le nom de la fonction */}
                                        <td>{personnel.id_service.nom_service}</td> {/* Afficher le nom du service */}
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

export default Personnel;
