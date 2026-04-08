export const saveToHistory = (type, target, resultSummary) => {
  try {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    // prevent immediate duplicates if target and type are the same as the last one
    if (history.length > 0 && history[0].type === type && history[0].target === target) {
      return; 
    }
    const newEntry = {
      id: Date.now().toString(),
      type,
      target,
      summary: resultSummary,
      timestamp: new Date().toISOString()
    };
    const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  } catch(e) {
    console.error('Failed to save history', e);
  }
};

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  } catch(e) {
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem('searchHistory');
};
