window.Storage = {
  save(key, value) {
    try {
      localStorage.setItem('ciaoItalia_' + key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  },
  load(key, defaultValue) {
    try {
      const item = localStorage.getItem('ciaoItalia_' + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Error loading from localStorage', e);
      return defaultValue;
    }
  },
  getProgress() {
    return this.load('progress', {
      completedDays: [],
      currentDay: 1,
      xp: 0,
      streak: 0,
      lastPlayedDate: null,
      unlockedLocations: [],
      badges: [],
      exerciseResults: {},
      settings: {}
    });
  },
  saveProgress(progress) {
    this.save('progress', progress);
  },
  getDailyWordIndex() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = (today - start) + ((start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day % 30;
  },
  getDailyTipIndex() {
    return (this.getDailyWordIndex() + 15) % 30;
  },
  isNewDay() {
    const progress = this.getProgress();
    if (!progress.lastPlayedDate) return true;
    
    const lastPlayed = new Date(progress.lastPlayedDate);
    const today = new Date();
    
    return lastPlayed.setHours(0,0,0,0) < today.setHours(0,0,0,0);
  },
  exportProgress() {
    return JSON.stringify(this.getProgress());
  },
  importProgress(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && typeof data === 'object' && data.currentDay !== undefined) {
        this.saveProgress(data);
        return true;
      }
    } catch (e) {
      console.error('Failed to import progress', e);
    }
    return false;
  },
  resetProgress() {
    localStorage.removeItem('ciaoItalia_progress');
  }
};
