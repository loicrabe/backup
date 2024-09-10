import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';

function DemandeAttente() {

    const user = localStorage.getItem('token');

    const [actionMaintData, setActionMaintData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFonction, setSelectedFonction] = useState(null);
    const [matricule, setMatricule] = useState('');
    const [idDemande, setIdDemande] = useState('');
    const [remarque, setRemarque] = useState('');
    const [dateRdv, setDateRdv] = useState('');
    const [inputFields, setInputFields] = useState(['']);
    const [lieuData, setLieuData] = useState([]);
    const [selectedLieu, setSelectedLieu] = useState('');

    const handleShowModal = (fonction) => {
        setMatricule(fonction.id_voiture.matricule);
        setIdDemande(fonction.id_demande_maintenence);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setInputFields(['']);
    };

    const selectAllLieu = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Lieu/selectAll_lieu');
            setLieuData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAllLieu();
    }, []);

    const insertValider = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/demande_maintenence_valider/insertion_demande_maintenence_validation', 
                {
                    remarque: remarque,
                    date_rdv: dateRdv,
                    id_lieu: selectedLieu, 
                    id_utilisateur: user,
                    id_demande_maintenence: idDemande
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Insertion réussie:', response.data);
        } catch (error) {
            console.error('Erreur de Validation', error);
        }
    };

    const selectAllActionMaintenance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/demande_maintenence/selectAll_demande_maintenence');
            setActionMaintData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAllActionMaintenance();
    }, []);

    const handleAddField = () => {
        setInputFields([...inputFields, '']);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="content-header">
                        <center><h2>Listes des demandes en attente</h2></center>
                        <button className="insert-vehicle-button">Insérer véhicule</button>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Immatricule</th>
                                    <th>Nom</th>
                                    <th>Service</th>
                                    <th>Fonction</th>
                                    <th>Action</th>
                                    <th>Rejet</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray(actionMaintData) && actionMaintData.length > 0 ? (
                                    actionMaintData.map(fonction => (
                                        <tr key={fonction.id_demande_maintenence}>
                                            <td>{fonction.id_demande_maintenence}</td>
                                            <td>{fonction.id_voiture.matricule}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.nom}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.id_service.nom_service}</td>
                                            <td>{fonction.id_utilisateur.id_personnel.id_fonction.nom_fonction}</td>
                                            <td>
                                                <button
                                                    className="validate-button"
                                                    title="Valider"
                                                    onClick={() => handleShowModal(fonction)}
                                                >
                                                    <i className="fas fa-check-circle"></i> Valider
                                                </button>
                                            </td>
                                            <td>
                                                <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter"></i>
                                                <i>Rejeter</i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">Aucune donnée disponible</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de validation */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Valider la demande</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Chargement des détails de la demande {matricule}</p>
                    <input
                        type="text"
                        placeholder="Insérer Remarque"
                        value={remarque}
                        onChange={(e) => setRemarque(e.target.value)}
                        required
                    /><br /><br />
                    <select 
                        value={selectedLieu} 
                        onChange={(e) => setSelectedLieu(e.target.value)} 
                        required
                    >
                        <option value="">Choisir un lieu</option>
                        {lieuData.length > 0 ? (
                            lieuData.map(lieu => (
                                <option key={lieu.id_lieu} value={lieu.id_lieu}>
                                    {lieu.nom_lieu}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Aucune donnée disponible</option>
                        )}
                    </select><br /><br />
                    <input
                        type="date"
                        value={dateRdv}
                        onChange={(e) => setDateRdv(e.target.value)}
                        required
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={insertValider}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DemandeAttente;
