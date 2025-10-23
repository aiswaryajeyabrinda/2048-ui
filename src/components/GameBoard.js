import React from 'react';
import Tile from './Tile';
import '../styles/Games.css';

const GameBoard = ({ board }) => {
    return (
        <div className="game-board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((value, colIndex) => (
                        <Tile key={`${rowIndex}-${colIndex}`} value={value} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;