import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.js';
import PlayerSetup from './playersetup.js';
import TicTacToe from './myGame.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/setup" element={<PlayerSetup />} />
                <Route path="/game" element={<TicTacToe />} />
            </Routes>
        </Router>
    );
}

export default App;