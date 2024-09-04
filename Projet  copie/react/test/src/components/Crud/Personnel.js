import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Personnel() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Personnel</h2>
                        <form>
                            <label>Nom Personnel:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Personnel"
                                required
                            />
                            <label>Matricule:</label>
                            <input
                                type="text"
                                placeholder="Insérer Matricule"
                                required
                            />
                            <label>ID Fonction:</label>
                            <select required>
                                <option value="">Choisir une Fonction</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>ID Service:</label>
                            <select required>
                                <option value="">Choisir un Service</option>
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
                                    <th>Nom Personnel</th>
                                    <th>Matricule</th>
                                    <th>ID Fonction</th>
                                    <th>ID Service</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>12345</td>
                                    <td>Fonction A</td>
                                    <td>Service B</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jane Smith</td>
                                    <td>67890</td>
                                    <td>Fonction X</td>
                                    <td>Service Y</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Personnel;
