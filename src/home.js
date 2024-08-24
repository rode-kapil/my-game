import React from 'react';
import { useNavigate } from 'react-router-dom';
import './myGame.css';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className='title welcome'>Welcome to the Tic Tac Toe Game</h1>
            <button className="reset start-button" onClick={() => navigate('/setup')}>Start Game</button>
        </div>
    );
}