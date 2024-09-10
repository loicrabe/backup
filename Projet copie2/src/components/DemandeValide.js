import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';

function DemandeValide() {
    const [actionMaintData, setActionMaintData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [pvData, setPvData] = useState({
        dates: '',
        numero: '',
        remarque: ''
    });
    const [rows, setRows] = useState([
        { select1: '', select2: '', select3: '', input1: '', input2: '' } // initial row
    ]);

    const selectAllActionMaintenanceValid = async () => {
        try {
            const response = await axios.get('http://localhost:8080/demande_maintenence_valider/selecAll_demande_maintenence_validation');
            setActionMaintData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAllActionMaintenanceValid();
    }, []);

    const handleShowModal = (validation) => {
        setSelectedRequest(validation);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/submit_pv', {
                ...pvData,
                id_demande: selectedRequest.id_demande_maintenence_valider
            });
            alert('PV inséré avec succès !');
            handleCloseModal();
        } catch (error) {
            console.error('Erreur lors de l\'insertion du PV', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPvData({
            ...pvData,
            [name]: value
        });
    };

    const handleRowChange = (index, event) => {
        const { name, value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    const handleAddField = () => {
        setRows([...rows, { select1: '', select2: '', select3: '', input1: '', input2: '' }]); // add a new row
    };

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="content-header">
                        <center><h2>Listes des demandes Valide</h2></center>
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
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(actionMaintData) && actionMaintData.length > 0 ? (
                                    actionMaintData.map(validation => (
                                        <tr key={validation.id_demande_maintenence_valider}>
                                            <td>{validation.id_demande_maintenence_valider}</td>
                                            <td>{validation.id_demande_maintenence.id_voiture.matricule}</td>
                                            <td>{validation.id_utilisateur.id_personnel.nom}</td>
                                            <td>{validation.id_utilisateur.id_personnel.id_service.nom_service}</td>
                                            <td>
                                                <button
                                                    className="validate-button"
                                                    title="Insertion PV"
                                                    onClick={() => handleShowModal(validation)}
                                                >
                                                    <i className="fas fa-check-circle"></i> Insert PV
                                                </button>
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

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Insérer PV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formDates">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Entrez la date"
                                name="dates"
                                value={pvData.dates}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNumero">
                            <Form.Label>Numéro</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Entrez le numéro"
                                name="numero"
                                value={pvData.numero}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRemarque">
                            <Form.Label>Remarque</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Entrez une remarque"
                                name="remarque"
                                value={pvData.remarque}
                                onChange={handleInputChange}
                            />
                        </Form.Group><br />

                        {/* Tableau à 5 colonnes */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Systeme</th>
                                    <th>Defaillance</th>
                                    <th>Piece a Remplacer </th>
                                    <th>Observation</th>
                                    <th>Ordre de Priorite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Control as="select" name="select1" value={row.select1} onChange={(e) => handleRowChange(index, e)}>
                                                <option value="">Sélectionner</option>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </Form.Control>
                                        </td>
                                        <td>
                                            <Form.Control as="select" name="select2" value={row.select2} onChange={(e) => handleRowChange(index, e)}>
                                                <option value="">Sélectionner</option>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </Form.Control>
                                        </td>
                                        <td>
                                            <Form.Control as="select" name="select3" value={row.select3} onChange={(e) => handleRowChange(index, e)}>
                                                <option value="">Sélectionner</option>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </Form.Control>
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrer un texte"
                                                name="input1"
                                                value={row.input1}
                                                onChange={(e) => handleRowChange(index, e)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="text"
                                                placeholder="Entrer un texte"
                                                name="input2"
                                                value={row.input2}
                                                onChange={(e) => handleRowChange(index, e)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Button variant="outline-primary" onClick={handleAddField}>
                            + Add
                        </Button><br></br><br></br>

                        <Button variant="secondary" onClick={handleCloseModal}>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit">
                            Soumettre
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DemandeValide;
