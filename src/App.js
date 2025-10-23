import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';
import { GameService } from './services/GameService';
import './styles/Games.css';

function App() {
    const [gameState, setGameState] = useState(null);
    const [boardSize, setBoardSize] = useState(4);

    const loadGameState = useCallback(async (size = 4) => {
        try {
            const state = await GameService.startGame(size);
            setGameState(state);
            setBoardSize(size);
        } catch (error) {
            console.error('Failed to start game:', error);
        }
    }, []);

    const handleMove = useCallback(async (direction) => {
        if (!gameState || gameState.gameOver || gameState.won) return;
        
        try {
            const newState = await GameService.makeMove(direction);
            setGameState(newState);
        } catch (error) {
            console.error('Move failed:', error);
        }
    }, [gameState]);

    const handleRestart = useCallback(async (size) => {
        await loadGameState(size);
    }, [loadGameState]);

    const handleSizeChange = useCallback(async (newSize) => {
        await loadGameState(newSize);
    }, [loadGameState]);

    useEffect(() => {
        loadGameState();
    }, [loadGameState]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const keyHandlers = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right',
                'w': 'up',
                's': 'down',
                'a': 'left',
                'd': 'right'
            };

            const direction = keyHandlers[event.key];
            if (direction) {
                event.preventDefault();
                handleMove(direction);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleMove]);

    if (!gameState) {
        return <div className="loading">Loading Game...</div>;
    }

    return (
        <div className="app">
            <h1 className="game-title">2048</h1>
            <GameControls
                onRestart={handleRestart}
                onSizeChange={handleSizeChange}
                currentSize={boardSize}
                score={gameState.score}
                gameOver={gameState.gameOver}
                won={gameState.won}
            />
            <GameBoard board={gameState.board} />
            <div className="mobile-controls">
                <button onClick={() => handleMove('up')}>↑</button>
                <div>
                    <button onClick={() => handleMove('left')}>←</button>
                    <button onClick={() => handleMove('down')}>↓</button>
                    <button onClick={() => handleMove('right')}>→</button>
                </div>
            </div>
        </div>
    );
}

export default App;