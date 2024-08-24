import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './myGame.css';

let data = ["", "", "", "", "", "", "", "", ""];

export default function TicTacToe() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate to navigate between pages
    const { player1, player2 } = location.state || { player1: 'Player 1', player2: 'Player 2' };

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [winner, setWinner] = useState(null);
    let [winningMessage, setWinningMessage] = useState('Tic Tac Toe Game Between ' + player1 + ' and ' + player2);
    let titleRef = useRef(null);

    useEffect(() => {
        if (winner) {
            const message = (
                <span style={{ textShadow: '0 0 5px', fontSize: '50px', marginRight: '10px', fontWeight: '700', animation: 'bounce 1s infinite, zoomOut 1s forwards, zoomIn 1s forwards' }}>
                    Congratulations, the winner is <span style={{ color: 'red', fontSize: '60px' }}>{winner === 'x' ? player1 : player2}</span>
                </span>
            );
            setWinningMessage(message);

            // Apply animation styles
            document.head.appendChild(document.createElement('style')).innerHTML = `
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-30px);
                    }
                    60% {
                        transform: translateY(-15px);
                    }
                }
                @keyframes zoomOut {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(0);
                    }
                }
                @keyframes zoomIn {
                    0% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `;
        }
    }, [winner]);

    const toggle = (e, num) => {
        if (lock) return;

        if (count % 2 === 0) {
            e.target.innerText = "x";
            e.target.style.color = "#f50303";
            data[num] = "x";
        } else {
            e.target.innerText = "o";
            e.target.style.color = "#0aa2e3";
            data[num] = "o";
        }

        setCount(count + 1);
        checkWinner();
    };

    function won(winner) {
        setLock(true);
        setWinner(winner); // Set the winner to trigger confetti
    }

    function isDraw() {
        return data.every(cell => cell !== "") && !lock;
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }

        if (isDraw()) {
            setWinningMessage(
                <span style={{ color: 'yellow', fontSize: '50px', fontWeight: '700' }}>It's a Draw! Play Again</span>
            );
            setLock(true);
        }
    }

    function resetGame() {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        setWinner(null);
        setWinningMessage('Tic Tac Toe Game Between ' + player1 + ' and ' + player2);
        document.querySelectorAll('.boxes').forEach(box => {
            box.innerText = "";
        });
    }

    function goToHomePage() {
        resetGame(); 
        navigate('/');
    }

    return (
        <div className='container'>
            {winner && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={130} 
                    gravity={0.2} 
                    colors={winner === 'x' ? ['#f50303', '#FFFFFF', "yellow", "green"] : ['#0aa2e3', '#FFFFFF', "yellow", "green"]} 
                />
            )}
            <h1 className="title" ref={titleRef}>{winningMessage}</h1>
            <div className="board">
                <div className="row1">
                    <button className="boxes" onClick={(e) => toggle(e, 0)} disabled={!!data[0]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 1)} disabled={!!data[1]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 2)} disabled={!!data[2]}></button>
                </div>
                <div className="row2">
                    <button className="boxes" onClick={(e) => toggle(e, 3)} disabled={!!data[3]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 4)} disabled={!!data[4]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 5)} disabled={!!data[5]}></button>
                </div>
                <div className="row3">
                    <button className="boxes" onClick={(e) => toggle(e, 6)} disabled={!!data[6]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 7)} disabled={!!data[7]}></button>
                    <button className="boxes" onClick={(e) => toggle(e, 8)} disabled={!!data[8]}></button>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>{lock ? "New Game" : "Reset"}</button>
            {lock && <button className="home-button" onClick={goToHomePage}>Home</button>}
        </div>
    );
}