import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Facture() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Facture</h2>
                        <form>
                            <label>Date:</label>
                            <input
                                type="date"
                                required
                            />
                            <label>Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                required
                            />
                            <label>ID Utilisateur:</label>
                            <select required>
                                <option value="">Choisir un Utilisateur</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>ID Rendez-vous:</label>
                            <select required>
                                <option value="">Choisir un Rendez-vous</option>
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
                                    <th>Date</th>
                                    <th>Image</th>
                                    <th>ID Utilisateur</th>
                                    <th>ID Rendez-vous</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2024-01-15</td>
                                    <td><img src="example.jpg" alt="Facture" width="100" /></td>
                                    <td>Utilisateur A</td>
                                    <td>Rendez-vous X</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2024-02-10</td>
                                    <td><img src="example.jpg" alt="Facture" width="100" /></td>
                                    <td>Utilisateur B</td>
                                    <td>Rendez-vous Y</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Facture;
