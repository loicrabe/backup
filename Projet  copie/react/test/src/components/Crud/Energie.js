import React, { useState, useEffect } from 'react';
import axios from 'axios';import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Energie() {

    const [data, setData] = useState('');
    const [fonctionData, setFonctionData] = useState([]);

    const energie = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/Energie/insertion_Energie`, 
                { nom_energie: data }, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            console.log('Insertion réussie:', response.data);
            selectAll_Energie();  // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur de Verification', error);
        }
    };

    const selectAll_Energie = async () => {
        try {
            const response = await axios.get('http://localhost:8080/Energie/selectAll_Energie');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setFonctionData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    useEffect(() => {
        selectAll_Energie();
        console.log("Set ", fonctionData)
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Énergie</h2>
                        <form onSubmit={energie}>
                            <label>Nom Énergie:</label>
                            <input
                                type="text"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    <div className="table-container">
                        <h3>Listes de energie</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom Energie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(fonctionData) && fonctionData.length > 0 ? (
                                    fonctionData.map(energie => (
                                        <tr key={energie.id_energie}>
                                            <td>{energie.nom_energie}</td>
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

export default Energie;
