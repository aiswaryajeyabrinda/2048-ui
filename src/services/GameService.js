const API_BASE = 'http://localhost:8080/api/2048';

export const GameService = {
    startGame: async (size = 4) => {
        const response = await fetch(`${API_BASE}/start?size=${size}`, {
            method: 'POST'
        });
        return await response.json();
    },

    makeMove: async (direction) => {
        const response = await fetch(`${API_BASE}/move?direction=${direction}`, {
            method: 'POST'
        });
        return await response.json();
    },

    getGameState: async () => {
        const response = await fetch(`${API_BASE}/state`);
        return await response.json();
    },

    restartGame: async (size = 4) => {
        const response = await fetch(`${API_BASE}/restart?size=${size}`, {
            method: 'POST'
        });
        return await response.json();
    }
};