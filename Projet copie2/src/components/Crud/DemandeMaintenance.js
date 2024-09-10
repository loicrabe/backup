import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function DemandeMaintenance() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Demande de Maintenance</h2>
                        <form>
                            <label>ID Voiture:</label>
                            <select required>
                                <option value="">Choisir une Voiture</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>Date Début:</label>
                            <input
                                type="date"
                                required
                            />
                            <label>Date Fin:</label>
                            <input
                                type="date"
                                required
                            />
                            <label>Description:</label>
                            <input
                                type="textarea"
                                placeholder="Décrire la maintenance demandée"
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Exemple de Données</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID Voiture</th>
                                    <th>Date Début</th>
                                    <th>Date Fin</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Voiture A</td>
                                    <td>2024-01-15</td>
                                    <td>2024-01-20</td>
                                    <td>Révision périodique</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Voiture B</td>
                                    <td>2024-02-10</td>
                                    <td>2024-02-15</td>
                                    <td>Changement de pneus</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemandeMaintenance;
