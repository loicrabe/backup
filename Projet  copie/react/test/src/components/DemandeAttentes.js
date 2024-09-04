import React from 'react';
import { Link } from 'react-router-dom';
import Top from './TopMenu';
import Nav from './Nav';
import '../styles/Menu.css';

function DemandeAttente() {
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
                                    <th>Immatriculation</th>
                                    <th>A propos</th>
                                    <th>Action</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1545 TBF</td>
                                    <td><Link to="/vehicle-details/1545TBF">Proccess en cours ...</Link></td>
                                    <td>
                                        <i className="fas fa-check-circle action-icon validate-icon" title="Valider" onClick={() => {/* Logique pour valider */}}></i>
                                        <i>Valider</i>
                                    </td>
                                    <td>
                                        <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter" onClick={() => {/* Logique pour rejeter */}}></i>
                                        <i>Rejeter</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>7084 TAD</td>
                                    <td><Link to="/vehicle-details/7084TAD">Proccess en cours ...</Link></td>
                                    <td>
                                        <i className="fas fa-check-circle action-icon validate-icon" title="Valider" onClick={() => {/* Logique pour valider */}}></i>
                                        <i>Valider</i>
                                    </td>
                                    <td>
                                        <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter" onClick={() => {/* Logique pour rejeter */}}></i>
                                        <i>Rejeter</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3890 TBH</td>
                                    <td><Link to="/vehicle-details/3890TBH">Proccess en cours ...</Link></td>
                                    <td>
                                        <i className="fas fa-check-circle action-icon validate-icon" title="Valider" onClick={() => {/* Logique pour valider */}}></i>
                                        <i>Valider</i>
                                    </td>
                                    <td>
                                        <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter" onClick={() => {/* Logique pour rejeter */}}></i>
                                        <i>Rejeter</i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>7065 TCA</td>
                                    <td><Link to="/vehicle-details/7065TCA">Proccess en cours ...</Link></td>
                                    <td>
                                        <i className="fas fa-check-circle action-icon validate-icon" title="Valider" onClick={() => {/* Logique pour valider */}}></i>
                                        <i>Valider</i>
                                    </td>
                                    <td>
                                        <i className="fas fa-times-circle action-icon reject-icon" title="Rejeter" onClick={() => {/* Logique pour rejeter */}}></i>
                                        <i>Rejeter</i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemandeAttente;
