import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Top from '../TopMenu';
import Nav from '../Nav';
import '../../styles/Menu.css';
import '../../styles/Form.css';

function Utilisateur() {
    const [motDePasse, setMotDePasse] = useState('');
    const [role, setRole] = useState('');
    const [personnel, setPersonnel] = useState('');

    const [roleData, setRoleData] = useState([]);
    const [personnelData, setPersonnelData] = useState([]);

    const ajouterUtilisateur = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/utilisateur/insertion_utilisateur',
                {
                    id_personnel: personnel,
                    pswd: motDePasse,
                    id_role: role
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Insertion réussie:', response.data);
            // selectAll_Utilisateur(); // Recharger les données après l'insertion
        } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur', error);
        }
    };

    // const selectAll_Refuser = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/refuser/selectAll_Refuser');
    //         setRefuserData(response.data.data);
    //     } catch (error) {
    //         console.error('Erreur de récupération des refusers', error);
    //     }
    // };

    const selectAll_Role = async () => {
        try {
            const response = await axios.get('http://localhost:8080/role/selectAll_role');
            console.log('Données récupérées:', response.data);  // Pour vérifier la structure des données
            setRoleData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des données', error);
        }
    };

    const selectAll_Personnel = async () => {
        try {
            const response = await axios.get('http://localhost:8080/personnel/selectAll_personnel');
            setPersonnelData(response.data.data);
        } catch (error) {
            console.error('Erreur de récupération des personnels', error);
        }
    };


    useEffect(() => {
        // selectAll_Refuser();
        selectAll_Role();
        selectAll_Personnel();
    }, []);

    return (
        <div className="menu-container">
            <Top />
            <div className="main-content">
                <Nav />
                <div className="content">
                    <div className="form-container">
                        <h2>Ajouter Utilisateur</h2>
                        <form onSubmit={ajouterUtilisateur}>
                        <label>Personnel:</label>
                            <select
                                value={personnel}
                                onChange={(e) => setPersonnel(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Personnel</option>
                                {personnelData.map((pers) => (
                                    <option key={pers.id_personnel} value={pers.id_personnel}>
                                        {pers.nom}
                                    </option>
                                ))}
                            </select>
                            
                            <label>Mot de Passe:</label>
                            <input
                                type="password"
                                placeholder="Insérer Mot de Passe"
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                                required
                            />
                            {/* <label>Refuser:</label>
                            <select
                                value={refuser}
                                onChange={(e) => setRefuser(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Refuser</option>
                                {refuserData.map((ref) => (
                                    <option key={ref.id_refuser} value={ref.id_refuser}>
                                        {ref.nom_refuser}
                                    </option>
                                ))}
                            </select> */}
                            <label>Rôle:</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Choisir un Rôle</option>
                                {roleData.map((r) => (
                                    <option key={r.id_role} value={r.id_role}>
                                        {r.nom_role}
                                    </option>
                                ))}
                            </select>
                            
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Utilisateur;
