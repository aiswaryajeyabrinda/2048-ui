import React, { useState } from 'react';
import '../styles/Games.css';

const GameControls = ({ onRestart, onSizeChange, currentSize, score, gameOver, won }) => {
    const [size, setSize] = useState(currentSize);
    const [showInstructions, setShowInstructions] = useState(false);

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        onSizeChange(newSize);
    };

    return (
        <div className="game-controls">
            <div className="score-board">
                <div className="score">Score: {score || 0}</div>
                {gameOver && !won && <div className="game-over">Game Over!</div>}
                {won && <div className="game-won">You Win!</div>}
            </div>
            
            <div className="controls">
                <div className="size-controls">
                    <label>Board Size: </label>
                    <select 
                        value={size} 
                        onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                    >
                        <option value={3}>3x3</option>
                        <option value={4}>4x4</option>
                        <option value={5}>5x5</option>
                        <option value={6}>6x6</option>
                    </select>
                </div>
            </div>
            
            <div className="right-controls">
                {/* <button 
                    className="restart-btn" 
                    onClick={() => onRestart(size)}
                >
                    Restart
                </button> */}
                
                <div className="instructions-tip">
                    <button 
                        className="tip-btn"
                        onClick={() => setShowInstructions(!showInstructions)}
                        onMouseEnter={() => setShowInstructions(true)}
                        onMouseLeave={() => setShowInstructions(false)}
                    >
                        💡 Tips
                    </button>
                    
                    {showInstructions && (
                        <div className="instructions-popup">
                            <p>Use arrow keys or WASD to move tiles</p>
                            <p>Combine tiles with the same number to reach 2048!</p>
                        </div>
                    )}
                </div>
                  <button 
                    className="restart-btn" 
                    onClick={() => onRestart(size)}
                >
                    Restart
                </button>
            </div>
        </div>
    );
};

export default GameControls;