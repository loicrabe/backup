import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Utilisateur() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Utilisateur</h2>
                        <form>
                            <label>Nom Utilisateur:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Utilisateur"
                                required
                            />
                            <label>Mot de Passe:</label>
                            <input
                                type="password"
                                placeholder="Insérer Mot de Passe"
                                required
                            />
                            <label>ID Refuser:</label>
                            <select required>
                                <option value="">Choisir un Refuser</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>ID Rôle:</label>
                            <select required>
                                <option value="">Choisir un Rôle</option>
                                {/* Ajouter les options dynamiquement */}
                            </select>
                            <label>ID Personnel:</label>
                            <select required>
                                <option value="">Choisir un Personnel</option>
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
                                    <th>Nom Utilisateur</th>
                                    <th>Mot de Passe</th>
                                    <th>ID Refuser</th>
                                    <th>ID Rôle</th>
                                    <th>ID Personnel</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>john_doe</td>
                                    <td>password123</td>
                                    <td>Refuser A</td>
                                    <td>Rôle B</td>
                                    <td>Personnel C</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>jane_smith</td>
                                    <td>password456</td>
                                    <td>Refuser X</td>
                                    <td>Rôle Y</td>
                                    <td>Personnel Z</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Utilisateur;
