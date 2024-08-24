import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './myGame.css';

export default function PlayerSetup() {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const navigate = useNavigate();

    const startGame = () => {
        if (player1 && player2) {
            navigate('/game', { state: { player1, player2 } });
        } else {
            alert('Please enter both player names');
        }
    };

    return (
        <div className="container setUpData">
            <h1 className='setPlayerHeading'>Player Setup</h1>
            <input
                className='inputs'
                type="text"
                placeholder=" Enter Player 1 Name as X"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
                className='inputs'
                type="text"
                placeholder="Enter Player 2 Name as O"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
            /><br />
            <button className="play" onClick={startGame}>Play</button>
        </div>
    );
}