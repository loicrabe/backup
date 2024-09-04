import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Kilometrage() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Kilométrage</h2>
                        <form>
                            <label>Nombre Kilométrage:</label>
                            <input
                                type="number"
                                placeholder="Insérer nombre Kilométrage"
                                required
                            />
                            <label>Date:</label>
                            <input
                                type="date"
                                required
                            />
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
                                    <th>Nombre Kilométrage</th>
                                    <th>Date</th>
                                    <th>ID Voiture</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>15000</td>
                                    <td>2024-01-15</td>
                                    <td>Voiture A</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>25000</td>
                                    <td>2024-02-20</td>
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

export default Kilometrage;
