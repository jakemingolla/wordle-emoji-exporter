const gameState = window.localStorage.getItem('gameState');
chrome.storage.local.set({ gameState });
