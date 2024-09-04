import React from 'react';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Maintenance() {
    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Maintenance</h2>
                        <form>
                            <label>Nom Maintenance:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Maintenance"
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
                                    <th>Nom Maintenance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Changement Huile</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Révision Complète</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Maintenance;
