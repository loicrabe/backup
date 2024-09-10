import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function DemandePretVoiture() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Demande de Prêt Voiture</h2>
                        <form>
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
                            <label>ID Utilisateur:</label>
                            <select required>
                                <option value="">Choisir un Utilisateur</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>ID Voiture:</label>
                            <select required>
                                <option value="">Choisir une Voiture</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Exemple de Données</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date Début</th>
                                    <th>Date Fin</th>
                                    <th>ID Utilisateur</th>
                                    <th>ID Voiture</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2024-01-15</td>
                                    <td>2024-01-30</td>
                                    <td>Utilisateur A</td>
                                    <td>Voiture A</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2024-02-10</td>
                                    <td>2024-02-25</td>
                                    <td>Utilisateur B</td>
                                    <td>Voiture B</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemandePretVoiture;
