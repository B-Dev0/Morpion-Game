import React, { useState, useEffect } from "react";
import Loader from './Loader';
import Game from "./App";

export default function Start() {
    // Ensure the 'hidden' class is managed consistently
    useEffect(() => {
        document.querySelector('body').classList.remove('hidden');
        return () => document.querySelector('body').classList.add('hidden');
    }, []);

    const [showGame, setShowGame] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [loading, setLoading] = useState(true);
    const [vsBot, setVsBot] = useState(false);
    const [desactiver, setDesactiver] = useState(true);

    useEffect(() => {
        // Simulate loading or operations
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Replace with actual loading logic if needed

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Manage header opacity based on loading state
        if (!loading) {
            document.querySelector('header').style.opacity = 1;
        } else {
            document.querySelector('header').style.opacity = 0;
        }
    }, [loading]);

    function launch(e) {
        e.preventDefault();
        setTimeout(() => {
            setShowGame(true);
        }, 700);
    }

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleSecondNameChange(e) {
        setSecondName(e.target.value);
    }

    function handleBot() {
        setVsBot(prevVsBot => !prevVsBot);
        setDesactiver(prevDesactiver => !prevDesactiver);
        document.querySelector('.modeBot').style.color = desactiver ? 'crimson' : 'blue';
    }
    
    useEffect(() => {
        vsBot ? setSecondName('Bot') : setSecondName('')
    }, [vsBot])

    if (showGame) {
        return <Game setDesactiver={setDesactiver} desactiver={desactiver} vsBot={vsBot} setVsBot={setVsBot} firstName={firstName} secondName={secondName} />;
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="start_container">
                    <div className="card">
                        <div className="header">
                            <p className="title">Tic Tac Toe (morpion)</p>
                        </div>
                        <div className="main">
                            <div className="player">
                                <ul className="player_x">
                                    <li>
                                        <i className="bi bi-1-circle"></i>
                                        <i className="bi bi-controller"></i>
                                        <span> nom : <span className="name">{firstName || 'x'}</span></span>
                                    </li>
                                </ul>
                                <ul className="player_o">
                                    <li>
                                        <i className="bi bi-2-circle"></i>
                                        <i className="bi bi-controller"></i>
                                        <span> nom : <span className="name">{secondName || 'o'}</span></span>
                                    </li>
                                </ul>
                            </div>
                            <form className="form">
                                <div className="first_player">
                                    <input
                                        type="text"
                                        name="first_player"
                                        id="first_player"
                                        placeholder="nom"
                                        maxLength={15}
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                    <label htmlFor="first_player">
                                        <i className="bi bi-1-circle"></i>
                                        <i className="bi bi-controller"></i>
                                    </label>
                                </div>
                                <div className="second_player">
                                    <input
                                        type="text"
                                        name="second_player"
                                        id="second_player"
                                        placeholder="nom"
                                        maxLength={15}
                                        value={secondName}
                                        onChange={handleSecondNameChange}
                                    />
                                    <label htmlFor="second_player">
                                        <i className="bi bi-2-circle"></i>
                                        <i className="bi bi-controller"></i>
                                    </label>
                                </div>
                                <button onClick={launch} className="start_button">
                                    <i className="bi bi-play-circle"> Start</i>
                                </button>
                            </form>
                            <div className="modeBot">
                                <i onClick={handleBot} className="bi bi-robot"></i> <span>{desactiver ? 'Off' : 'On'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
