import React from 'react';
import './Loader.css'; // Assure-toi de créer ce fichier CSS pour les styles du loader
import logo from '../img/pfp.png'
const Loader = () => {
    return (
        <div className="loader">
            <div className="logo">
                <img width={250} src={logo} alt="" />
            </div>
            <div className="load">
                <span></span><span></span><span></span>
            </div>
        </div>
    );
};

export default Loader;
