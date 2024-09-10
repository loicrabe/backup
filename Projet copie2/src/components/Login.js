import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    //     navigate('/menu');
    // };

    const Authentification = async (event) => {
        event.preventDefault();
        try {
            
          const response = await axios.post(`http://localhost:8080/Login/checking`, 
            { matricule: email , pswd : password }, {
            headers: {
              'content-Type': 'application/json',
            },
          });
          console.log('Verifier', response.data.data);
          const token=response.data.data.id_utilisateur;
          console.log(token);
          localStorage.setItem('token' , token);
          navigate('/menu');
        } catch (error) {
          console.error('Erreur de Verification', error);
        }
      };

    //   useEffect( () =>{
    //     Authentification();
    //     }, [])

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={Authentification}>
                <h2>S'inscrire</h2>
                <div>
                    <label>Immatriculation :</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login-actions">
                    <button type="submit">Se Connecter</button>
                    <a href="#" className="forgot-password">Mot de passe oublié?</a>
                </div>
                <div className="signup-section">
                    <button className="signup-button">S'inscrire</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
