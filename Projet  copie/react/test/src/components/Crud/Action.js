import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';
import Bouton from '../Bouton';

function Action() {

    const [data, setData] = useState('');
    const [idMaintenance, setMaintenance] = useState('');


    const Action = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Action/insertion_Action`, 
                { nom_action: data, id_maintenance: idMaintenance }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            // selectAll_Fonction();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };


    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Action</h2>
                        <form onSubmit={Action}>
                            <label>Nom Action:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Action"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            {/* <label>Maintenance a faire :</label> */}
                            {/* <select 
                                value={fonction}
                                onChange={(e) => setMaintenance(e.target.value)}
                                required
                            >
                                <option value="">Choisir une Fonction</option>
                                {fonctionData.map((func) => (
                                    <option key={func.id_fonction} value={func.id_fonction}>
                                        {func.nom_fonction}
                                    </option>
                                ))}
                            </select> */}
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Exemple de Données</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Vérification Système</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Nettoyage Composants</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;
