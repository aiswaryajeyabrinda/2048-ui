import React from 'react';
import '../styles/Games.css';

const Tile = ({ value }) => {
    const getTileClass = (value) => {
        if (value === 0) return 'tile tile-empty';
        return `tile tile-${value}`;
    };

    return (
        <div className={getTileClass(value)}>
            {value !== 0 ? value : ''}
        </div>
    );
};

export default Tile;