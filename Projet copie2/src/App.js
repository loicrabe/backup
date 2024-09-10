import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import VehicleDetails from './components/VehicleDetails';
import Accueil from './components/Accueil'; 
import Crud from './components/Crud';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Fonction from './components/Crud/Fonction';
import Service from './components/Crud/Service';
import Test from './components/Test';
import TypeLieu from './components/Crud/TypeLieu';
import Transmission from './components/Crud/Transmission';
import Energie from './components/Crud/Energie';
import ModelVoiture from './components/Crud/ModelVoiture';
import Voiture from './components/Crud/Voiture';
import Role from './components/Crud/Role';
import Personnel from './components/Crud/Personnel';
import Utilisateur from './components/Crud/Utilisateur';
import Kilometrage from './components/Crud/Kilometrage';
import Maintenance from './components/Crud/Maintenance';
import Action from './components/Crud/Action';
import DemandeMaintenance from './components/Crud/DemandeMaintenance';
import Entretien from './components/Entretien';
import PV from './components/Crud/PV';
import Facture from './components/Crud/Facture';
import Recu from './components/Crud/Recu';
import ReparationVoiture from './components/Crud/ReparationVoiture';
import DemandePretVoiture from './components/Crud/DemandePretVoiture';
import MarqueVoiture from './components/Crud/MarqueVoiture';
import DemandeAttente from './components/DemandeAttentes';
import Bouton from './components/Bouton';
import DemandeValide from './components/DemandeValide';
import Systeme from './components/Crud/Systeme';
import Defaillance from './components/Crud/Defaillance';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/vehicle-details/:immatriculation" element={<VehicleDetails />} />
                    <Route path="/accueil" element={<Accueil />} /> 
                    {/* Remplacez 'component' par 'element' et utilisez les balises JSX */}
                    <Route path="/crud" element={<Crud />} />
                    <Route path="/fonction" element={<Fonction />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/lieu" element={<TypeLieu />} />
                    <Route path="/transmission" element={<Transmission />} />
                    <Route path="/energie" element={<Energie />} />
                    <Route path="/model" element={<ModelVoiture />} />
                    <Route path="/voiture" element={<Voiture />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/personnel" element={<Personnel />} />
                    <Route path="/utilisateur" element={<Utilisateur />} />
                    <Route path="/kilometrage" element={<Kilometrage />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/action" element={<Action />} />
                    <Route path="/demande-maintenance" element={<DemandeMaintenance />} />
                    <Route path="/demande-entretien" element={<Entretien />} />
                    <Route path="/pv" element={<PV />} />
                    <Route path="/facture" element={<Facture />} />
                    <Route path="/recu" element={<Recu />} />
                    <Route path="/reparation-voiture" element={<ReparationVoiture />} />
                    <Route path="/demande-pret-voiture" element={<DemandePretVoiture />} />
                    <Route path="/marque" element={<MarqueVoiture />} />
                    <Route path="/demande-en-attente" element={<DemandeAttente />} />
                    <Route path="/bouton" element={<Bouton />} />
                    <Route path="/aaa" element={<Test />} />
                    <Route path="/demande_valide" element={<DemandeValide />} />
                    <Route path="/systeme" element={<Systeme />} />
                    <Route path="/defaillance" element={<Defaillance />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
