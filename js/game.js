window.Game = {
  Levels: [
    { name: 'Principiante', minXP: 0, maxXP: 200 },
    { name: 'Elementare', minXP: 201, maxXP: 500 },
    { name: 'Intermedio', minXP: 501, maxXP: 1000 },
    { name: 'Avanzato', minXP: 1001, maxXP: 999999 }
  ],
  
  Badges: [
    { id: 'first_word', name: 'Prima Parola', icon: '🗣️', condition: 'Complete first speaking exercise' },
    { id: 'chef', name: 'Chef Italiano', icon: '👨‍🍳', condition: 'Complete a cooking day' },
    { id: 'musician', name: 'Musicista', icon: '🎵', condition: 'Complete a music day' },
    { id: 'tourist', name: 'Turista', icon: '🗺️', condition: 'Unlock 5 locations' },
    { id: 'explorer', name: 'Esploratore', icon: '🧭', condition: 'Unlock 10 locations' },
    { id: 'week1', name: 'Prima Settimana', icon: '🌟', condition: 'Complete 7 days' },
    { id: 'week2', name: 'Due Settimane', icon: '💫', condition: 'Complete 14 days' },
    { id: 'streak3', name: 'Fuoco!', icon: '🔥', condition: '3-day streak' },
    { id: 'streak7', name: 'Inarrestabile', icon: '⚡', condition: '7-day streak' },
    { id: 'perfect', name: 'Perfetto!', icon: '💎', condition: 'Get all exercises right in a day' },
    { id: 'graduate', name: 'Laureato', icon: '🎓', condition: 'Complete all 30 days' },
    { id: 'polyglot', name: 'Poliglotta', icon: '🌍', condition: 'Reach 1000 XP' }
  ],

  addXP(amount) {
    const progress = Storage.getProgress();
    const oldLevel = this.getLevel(progress.xp);
    
    progress.xp += amount;
    Storage.saveProgress(progress);
    
    const newLevel = this.getLevel(progress.xp);
    if (newLevel.name !== oldLevel.name) {
      this.showLevelUp(newLevel);
    }
    
    this.checkBadgeConditions();
    return progress.xp;
  },
  
  getLevel(xp = Storage.getProgress().xp) {
    let current = this.Levels[0];
    for (let i = 0; i < this.Levels.length; i++) {
      if (xp >= this.Levels[i].minXP) {
        current = this.Levels[i];
      }
    }
    
    let progress = 0;
    if (current.maxXP < 999999) {
      progress = (xp - current.minXP) / (current.maxXP - current.minXP);
    } else {
      progress = 1;
    }
    
    return {
      level: this.Levels.indexOf(current) + 1,
      name: current.name,
      minXP: current.minXP,
      maxXP: current.maxXP,
      progress: progress,
      currentXP: xp
    };
  },
  
  checkDayCompletion(dayId) {
    const progress = Storage.getProgress();
    const dayResults = progress.exerciseResults[dayId] || [];
    if (!dayResults.length) return false;
    
    const correct = dayResults.filter(r => r.correct).length;
    const ratio = correct / window.CiaoData.days.find(d => d.id === dayId).exercises.length;
    return ratio >= 0.7;
  },
  
  unlockNextDay() {
    const progress = Storage.getProgress();
    if (this.checkDayCompletion(progress.currentDay) && progress.currentDay < 30) {
      if (!progress.completedDays.includes(progress.currentDay)) {
        progress.completedDays.push(progress.currentDay);
      }
      progress.currentDay++;
      
      const newLocations = window.CiaoData.locations.filter(loc => loc.unlockedByDay <= progress.currentDay).map(l => l.id);
      newLocations.forEach(id => {
        if (!progress.unlockedLocations.includes(id)) {
          progress.unlockedLocations.push(id);
        }
      });
      
      Storage.saveProgress(progress);
      this.checkBadgeConditions();
    }
  },
  
  canAccessDay(dayId) {
    if (dayId === 1) return true;
    const progress = Storage.getProgress();
    return dayId <= progress.currentDay || progress.completedDays.includes(dayId);
  },
  
  getStreak() {
    return Storage.getProgress().streak;
  },
  
  updateStreak() {
    const progress = Storage.getProgress();
    const today = new Date();
    today.setHours(0,0,0,0);
    
    if (!progress.lastPlayedDate) {
      progress.streak = 1;
    } else {
      const lastPlayed = new Date(progress.lastPlayedDate);
      lastPlayed.setHours(0,0,0,0);
      
      const diffTime = Math.abs(today - lastPlayed);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays === 1) {
        progress.streak += 1;
      } else if (diffDays > 1) {
        progress.streak = 1;
      }
    }
    
    progress.lastPlayedDate = new Date().toISOString();
    Storage.saveProgress(progress);
    this.checkBadgeConditions();
  },
  
  earnBadge(badgeId) {
    const progress = Storage.getProgress();
    if (!progress.badges.includes(badgeId)) {
      progress.badges.push(badgeId);
      Storage.saveProgress(progress);
      const badge = this.Badges.find(b => b.id === badgeId);
      if (badge) {
        this.showBadgeEarned(badge);
      }
    }
  },
  
  getBadges() {
    const progress = Storage.getProgress();
    return this.Badges.map(badge => ({
      ...badge,
      earned: progress.badges.includes(badge.id)
    }));
  },
  
  checkBadgeConditions() {
    const p = Storage.getProgress();
    
    if (p.streak >= 3) this.earnBadge('streak3');
    if (p.streak >= 7) this.earnBadge('streak7');
    if (p.completedDays.length >= 7) this.earnBadge('week1');
    if (p.completedDays.length >= 14) this.earnBadge('week2');
    if (p.completedDays.length === 30) this.earnBadge('graduate');
    if (p.unlockedLocations.length >= 5) this.earnBadge('tourist');
    if (p.unlockedLocations.length >= 10) this.earnBadge('explorer');
    if (p.xp >= 1000) this.earnBadge('polyglot');
    
    if (window.CiaoData) {
      const chefDays = window.CiaoData.days.filter(d => d.theme === 'cooking').map(d => d.id);
      if (chefDays.some(id => p.completedDays.includes(id))) this.earnBadge('chef');
      
      const musicDays = window.CiaoData.days.filter(d => d.theme === 'music').map(d => d.id);
      if (musicDays.some(id => p.completedDays.includes(id))) this.earnBadge('musician');
    }
  },
  
  showConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    const colors = ['#1B6B3A', '#FFFFFF', '#C62828', '#FFB300'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      container.appendChild(confetti);
    }
    
    setTimeout(() => {
      container.innerHTML = '';
    }, 5000);
  },
  
  showXPAnimation(amount, element) {
    if (!element) return;
    const floater = document.createElement('div');
    floater.className = 'xp-floater';
    floater.innerText = `+${amount} XP`;
    
    const rect = element.getBoundingClientRect();
    floater.style.left = (rect.left + rect.width / 2) + 'px';
    floater.style.top = rect.top + 'px';
    
    document.body.appendChild(floater);
    setTimeout(() => {
      floater.remove();
    }, 1500);
  },
  
  showLevelUp(newLevel) {
    this.showModal('¡Nivel Alcanzado!', `¡Felicidades! Has llegado al nivel: ${newLevel.name} 🎓`);
    this.showConfetti();
  },
  
  showBadgeEarned(badge) {
    this.showModal('¡Nueva Insignia!', `${badge.icon} ${badge.name}\n${badge.condition}`);
    this.showConfetti();
  },
  
  showModal(title, text) {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    
    overlay.innerHTML = `
      <div class="modal glass-card">
        <h2>${title}</h2>
        <p>${text.replace('\\n', '<br>')}</p>
        <button class="btn primary" onclick="document.getElementById('modal-overlay').classList.remove('active')">Continuar</button>
      </div>
    `;
    overlay.classList.add('active');
  }
};
