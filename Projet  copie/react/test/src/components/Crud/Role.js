import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import Bouton from '../Bouton';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Role() {

    const [data, setData] = useState('');
    const [RoleData, setRoleData] = useState([]);

    const Role = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/role/insertion_role`, 
                { nom_role: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Role();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Role = async () => {
        try {
            const response = await axios.get('http://localhost:8080/role/selectAll_role');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setRoleData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Role();
        console.log("Set ", RoleData)
    }, []);


    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                <Bouton />
                    <div className="form-container">
                        <h2>Ajouter Rôle</h2>
                        <form onSubmit={Role}>
                            <label>Nom Rôle:</label>
                            <input
                                type="text"
                                placeholder="Insérer nom Rôle"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h2>Listes des Roles</h2>
                        <table>
                            <thead>
                                 <tr>
                                    <th>Nom Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(RoleData) && RoleData.length > 0 ? (
                                    RoleData.map(Role => (
                                        <tr key={Role.id_role}>
                                            <td>{Role.nom_role}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td>Aucune donnée disponible</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
