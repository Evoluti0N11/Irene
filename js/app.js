window.App = {
  currentView: 'home',
  lessonState: {
    dayId: null,
    currentExerciseIndex: 0,
    results: []
  },

  init() {
    this.bindEvents();
    
    // Ensure Day 1 location is always unlocked
    const progress = Storage.getProgress();
    if (window.CiaoData && window.CiaoData.locations) {
      const day1Locs = window.CiaoData.locations.filter(l => l.unlockedByDay <= progress.currentDay);
      day1Locs.forEach(loc => {
        if (!progress.unlockedLocations.includes(loc.id)) {
          progress.unlockedLocations.push(loc.id);
        }
      });
      Storage.saveProgress(progress);
    }
    
    this.handleRouting();
    
    // Check if new day for streaks
    if (Storage.isNewDay()) {
      Game.updateStreak();
    }
    
    // Check for onboarding
    if (!progress.settings.hasSeenOnboarding) {
      document.getElementById('onboarding').style.display = 'flex';
    }
  },

  bindEvents() {
    window.addEventListener('hashchange', () => this.handleRouting());
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = e.currentTarget.getAttribute('href');
        window.location.hash = hash;
      });
    });
  },

  handleRouting() {
    const hash = window.location.hash || '#home';
    const parts = hash.substring(1).split('/');
    const view = parts[0];
    
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const navItem = document.querySelector(`.nav-item[href="#${view}"]`);
    if (navItem) navItem.classList.add('active');
    
    const viewEl = document.getElementById(`${view}-view`);
    if (viewEl) {
      viewEl.classList.add('active');
      this.currentView = view;
      this[`render${view.charAt(0).toUpperCase() + view.slice(1)}View`](parts);
    } else {
      window.location.hash = '#home';
    }
  },

  renderHomeView() {
    const progress = Storage.getProgress();
    const currentDayData = window.CiaoData.days.find(d => d.id === progress.currentDay) || window.CiaoData.days[0];
    const levelInfo = Game.getLevel();
    
    const wordIndex = Storage.getDailyWordIndex();
    const tipIndex = Storage.getDailyTipIndex();
    const dailyWord = window.CiaoData.dailyWords ? window.CiaoData.dailyWords[wordIndex] : {word: 'Ciao', meaningEs: 'Hola', exampleIt: 'Ciao, come stai?', exampleEs: 'Hola, ¿cómo estás?'};
    const dailyTip = window.CiaoData.dailyTips ? window.CiaoData.dailyTips[tipIndex] : "¡Practica todos los días!";

    document.getElementById('home-view').innerHTML = `
      <div class="header-content">
        <h1>¡Ciao! 👋</h1>
        <div class="stats-row">
          <div class="stat-pill"><span class="icon">🔥</span> ${progress.streak} días</div>
          <div class="stat-pill"><span class="icon">🎓</span> Lvl ${levelInfo.level}</div>
        </div>
      </div>
      
      <div class="card continue-card">
        <h2>Día ${currentDayData.id}: ${currentDayData.titleEs}</h2>
        <p>${currentDayData.descriptionEs}</p>
        <button class="btn primary full-width" onclick="window.location.hash='#lesson/${currentDayData.id}'">
          ${progress.completedDays.includes(currentDayData.id) ? 'Repasar Día' : 'Continuar Día ' + currentDayData.id}
        </button>
      </div>
      
      <div class="daily-cards">
        <div class="card daily-word">
          <h3>Palabra del Día</h3>
          <div class="word-display">
            <h2>${dailyWord.word}</h2>
            <button class="icon-btn" onclick="Speech.speak('${dailyWord.word}')">🔊</button>
          </div>
          <p class="meaning">${dailyWord.meaningEs}</p>
          <div class="example">
            <p><i>"${dailyWord.exampleIt}"</i></p>
            <p>${dailyWord.exampleEs}</p>
          </div>
        </div>
        
        <div class="card daily-tip">
          <h3>💡 Tip del Día</h3>
          <p>${dailyTip}</p>
        </div>
      </div>
      
      <div class="roadmap-preview">
        <h3>Tu Progreso</h3>
        <div class="horizontal-scroll">
          ${window.CiaoData.days.map(d => `
            <div class="day-card ${progress.completedDays.includes(d.id) ? 'completed' : (d.id === progress.currentDay ? 'current' : 'locked')}"
                 onclick="if(Game.canAccessDay(${d.id})) window.location.hash='#lesson/${d.id}'">
              <div class="day-icon">${d.icon}</div>
              <div class="day-num">Día ${d.id}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderLessonView(parts) {
    const dayId = parseInt(parts[1]);
    if (!dayId || !Game.canAccessDay(dayId)) {
      window.location.hash = '#home';
      return;
    }
    
    this.lessonState.dayId = dayId;
    this.lessonState.currentExerciseIndex = 0;
    this.lessonState.results = [];
    
    const dayData = window.CiaoData.days.find(d => d.id === dayId);
    
    document.getElementById('lesson-view').innerHTML = `
      <div class="lesson-header">
        <button class="icon-btn" onclick="window.location.hash='#home'">❌</button>
        <div class="progress-bar-container">
          <div class="progress-bar" id="lesson-progress" style="width: 0%"></div>
        </div>
        <div class="xp-display">0 XP</div>
      </div>
      
      <div id="exercise-container"></div>
    `;
    
    this.renderExercise();
  },

  renderExercise() {
    const dayData = window.CiaoData.days.find(d => d.id === this.lessonState.dayId);
    const container = document.getElementById('exercise-container');
    
    if (this.lessonState.currentExerciseIndex === 0 && dayData.culturalNote) {
      container.innerHTML = `
        <div class="card cultural-note fade-in">
          <h2>${dayData.culturalNoteTitle || 'Nota Cultural'}</h2>
          <p>${dayData.culturalNote}</p>
          <button class="btn primary full-width mt-4" onclick="App.nextExercise()">Comenzar Ejercicios</button>
        </div>
      `;
      return;
    }
    
    // Adjust index if there's a cultural note (which takes up 'index 0' conceptually)
    const exerciseIdx = dayData.culturalNote ? this.lessonState.currentExerciseIndex - 1 : this.lessonState.currentExerciseIndex;
    
    if (exerciseIdx >= dayData.exercises.length) {
      this.finishLesson();
      return;
    }
    
    const exercise = dayData.exercises[exerciseIdx];
    const progressPct = ((exerciseIdx) / dayData.exercises.length) * 100;
    document.getElementById('lesson-progress').style.width = `${progressPct}%`;
    
    let exHtml = `<div class="exercise fade-in"><h2 class="instruction">${exercise.instruction}</h2>`;
    
    const escapeAttr = (str) => str ? str.replace(/'/g, "\\'").replace(/"/g, '&quot;') : '';

    switch (exercise.type) {
      case 'multiple_choice':
        exHtml += `
          <div class="options-grid">
            ${exercise.options.map((opt) => `
              <button class="btn option-btn" onclick="App.checkMultipleChoice('${escapeAttr(opt)}', '${escapeAttr(exercise.correctAnswer)}', this, ${exercise.xp})">
                <span class="opt-text">${opt}</span>
                <span class="opt-speaker" onclick="event.stopPropagation(); Speech.speak('${escapeAttr(opt)}')">🔊</span>
              </button>
            `).join('')}
          </div>
        `;
        break;
      case 'speaking':
        exHtml += `
          <div class="speaking-target">
            <h3>${exercise.targetPhrase}</h3>
            <p class="translation">${exercise.translationEs}</p>
            <div class="speak-controls">
              <button class="icon-btn" onclick="Speech.speak('${escapeAttr(exercise.targetPhrase)}')">🔊</button>
              <button class="icon-btn small" onclick="Speech.speakSlow('${escapeAttr(exercise.targetPhrase)}')">🐢</button>
            </div>
            ${exercise.hint ? `<p class="hint-text">💡 ${exercise.hint}</p>` : ''}
          </div>
          <div class="mic-container">
            <button class="mic-btn" id="mic-btn" onclick="App.handleSpeakingExercise('${escapeAttr(exercise.targetPhrase)}', ${exercise.xp})">
              🎤
            </button>
            <p class="mic-label">Toca para hablar</p>
          </div>
          <div id="speech-feedback"></div>
        `;
        break;
      case 'writing':
        exHtml += `
          <div class="writing-input">
            <input type="text" id="writing-answer" placeholder="Escribe tu respuesta aquí..." autocomplete="off" autocapitalize="none">
            <button class="btn primary mt-2 full-width" onclick="App.checkWriting('${escapeAttr(exercise.correctAnswer)}', ${exercise.xp}, ${JSON.stringify(exercise.acceptableAnswers || [])})">Comprobar</button>
          </div>
          <div id="writing-feedback"></div>
        `;
        break;
      case 'conversation':
        exHtml += `
          <div class="conversation-container">
            ${exercise.dialogue.map((line, idx) => `
              <div class="dialogue-line ${line.speaker === 'Tu' ? 'user-line' : 'other-line'}" id="dialogue-${idx}">
                <div class="speaker-name">${line.speaker}</div>
                <div class="dialogue-bubble ${line.speaker === 'Tu' ? 'user-bubble' : 'other-bubble'}">
                  <p class="dialogue-text">${line.text}</p>
                  <p class="dialogue-translation">${line.translationEs}</p>
                  ${line.speaker !== 'Tu' ? 
                    `<button class="icon-btn small" onclick="Speech.speak('${escapeAttr(line.text)}')">🔊</button>` : 
                    `<button class="icon-btn small mic-small" onclick="App.handleConversationLine('${escapeAttr(line.text)}', ${idx})">🎤</button>`
                  }
                </div>
                <div class="line-feedback" id="line-feedback-${idx}"></div>
              </div>
            `).join('')}
          </div>
          <button class="btn primary full-width mt-4" onclick="App.finishConversation(${exercise.xp})">Completar Diálogo</button>
        `;
        break;
      case 'fill_blank':
        exHtml += `
          <div class="fill-blank-container">
            <p class="fill-sentence">${exercise.sentence}</p>
            ${exercise.options ? `
              <div class="options-grid">
                ${exercise.options.map((opt) => `
                  <button class="btn option-btn" onclick="App.checkMultipleChoice('${escapeAttr(opt)}', '${escapeAttr(exercise.correctAnswer)}', this, ${exercise.xp})">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            ` : `
              <div class="writing-input">
                <input type="text" id="writing-answer" placeholder="Escribe la palabra...">
                <button class="btn primary mt-2 full-width" onclick="App.checkWriting('${escapeAttr(exercise.correctAnswer)}', ${exercise.xp}, ${JSON.stringify(exercise.acceptableAnswers || [])})">Comprobar</button>
              </div>
            `}
          </div>
          <div id="writing-feedback"></div>
        `;
        break;
      case 'matching':
        exHtml += `
          <div class="matching-container">
            <p class="match-instruction">Toca una palabra italiana y luego su traducción en español</p>
            <div class="match-columns">
              <div class="match-col" id="match-italian">
                ${exercise.pairs.map((p, i) => `
                  <button class="btn match-btn" data-match-idx="${i}" data-match-side="it" onclick="App.handleMatch(this, ${i}, 'it')">${p.italian}</button>
                `).join('')}
              </div>
              <div class="match-col" id="match-spanish">
                ${exercise.pairs.sort(() => Math.random() - 0.5).map((p, i) => `
                  <button class="btn match-btn" data-match-idx="${exercise.pairs.indexOf(p)}" data-match-side="es" onclick="App.handleMatch(this, ${exercise.pairs.indexOf(p)}, 'es')">${p.spanish}</button>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        break;
      default:
        exHtml += `<p>Tipo de ejercicio: ${exercise.type}</p><button class="btn primary" onclick="App.nextExercise()">Continuar</button>`;
    }
    
    exHtml += `</div>`;
    container.innerHTML = exHtml;
  },

  checkMultipleChoice(selected, correct, btnEl, xp) {
    const isCorrect = selected === correct;
    btnEl.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => {
      b.disabled = true;
      if (b.innerText.trim() === correct && !isCorrect) {
        b.classList.add('correct');
      }
    });
    
    this.recordResult(isCorrect, xp);
    
    setTimeout(() => {
      this.nextExercise();
    }, 1500);
  },

  async handleSpeakingExercise(target, xp) {
    const btn = document.getElementById('mic-btn');
    const feedback = document.getElementById('speech-feedback');
    
    if (Speech.isListening) {
      Speech.stopRecognition();
      return;
    }
    
    try {
      btn.classList.add('pulse');
      feedback.innerHTML = '<p>Escuchando...</p>';
      
      const { transcript } = await Speech.startRecognition();
      btn.classList.remove('pulse');
      
      const result = Speech.comparePronunciation(transcript, target);
      const isCorrect = result.score > 1;
      
      feedback.innerHTML = `
        <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
          <h4>${result.feedback}</h4>
          <p>${result.details}</p>
        </div>
      `;
      
      this.recordResult(isCorrect, isCorrect ? xp : Math.floor(xp/2));
      
      setTimeout(() => {
        this.nextExercise();
      }, 3000);
      
    } catch (e) {
      btn.classList.remove('pulse');
      feedback.innerHTML = `<p class="error">Error: ${e.message}</p>`;
    }
  },

  checkWriting(correct, xp, acceptable) {
    const input = document.getElementById('writing-answer');
    const answer = input.value.trim().toLowerCase();
    const isCorrect = answer === correct.toLowerCase() || acceptable.map(a => a.toLowerCase()).includes(answer);
    
    const feedback = document.getElementById('writing-feedback');
    feedback.innerHTML = `
      <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'}">
        <h4>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</h4>
        <p>${isCorrect ? '' : 'La respuesta correcta es: ' + correct}</p>
      </div>
    `;
    
    this.recordResult(isCorrect, xp);
    
    setTimeout(() => {
      this.nextExercise();
    }, 2000);
  },

  recordResult(correct, xp) {
    this.lessonState.results.push({ correct, xp });
    if (correct && xp > 0) {
      const earnedXP = Game.addXP(xp);
      document.querySelector('.xp-display').innerText = `${earnedXP} XP`;
      Game.showXPAnimation(xp, document.querySelector('.xp-display'));
    }
  },

  nextExercise() {
    this.lessonState.currentExerciseIndex++;
    this.renderExercise();
  },

  async handleConversationLine(targetText, lineIdx) {
    const feedbackEl = document.getElementById(`line-feedback-${lineIdx}`);
    if (!feedbackEl) return;
    
    try {
      feedbackEl.innerHTML = '<p class="listening-msg">🎤 Escuchando...</p>';
      const { transcript } = await Speech.startRecognition();
      const result = Speech.comparePronunciation(transcript, targetText);
      
      feedbackEl.innerHTML = `
        <div class="feedback-card ${result.score > 1 ? 'correct' : 'incorrect'} small-feedback">
          <span>${'⭐'.repeat(result.score)}</span> ${result.feedback}
        </div>
      `;
    } catch (e) {
      feedbackEl.innerHTML = `<p class="error-small">${e.message}</p>`;
    }
  },

  finishConversation(xp) {
    this.recordResult(true, xp);
    setTimeout(() => this.nextExercise(), 500);
  },

  matchState: { selected: null },

  handleMatch(btn, idx, side) {
    if (!this.matchState.selected) {
      this.matchState.selected = { btn, idx, side };
      btn.classList.add('match-selected');
    } else {
      const prev = this.matchState.selected;
      if (prev.side === side) {
        prev.btn.classList.remove('match-selected');
        this.matchState.selected = { btn, idx, side };
        btn.classList.add('match-selected');
      } else {
        if (prev.idx === idx) {
          prev.btn.classList.add('match-correct');
          btn.classList.add('match-correct');
          prev.btn.disabled = true;
          btn.disabled = true;
        } else {
          prev.btn.classList.add('match-incorrect');
          btn.classList.add('match-incorrect');
          setTimeout(() => {
            prev.btn.classList.remove('match-incorrect');
            btn.classList.remove('match-incorrect');
          }, 800);
        }
        prev.btn.classList.remove('match-selected');
        this.matchState.selected = null;
        
        const allDone = document.querySelectorAll('.match-btn:not([disabled])').length === 0;
        if (allDone) {
          this.recordResult(true, 15);
          setTimeout(() => this.nextExercise(), 1000);
        }
      }
    }
  },

  finishLesson() {
    document.getElementById('lesson-progress').style.width = '100%';
    const container = document.getElementById('exercise-container');
    
    const correctCount = this.lessonState.results.filter(r => r.correct).length;
    const totalXP = this.lessonState.results.reduce((sum, r) => sum + (r.correct ? r.xp : 0), 0);
    
    const progress = Storage.getProgress();
    progress.exerciseResults[this.lessonState.dayId] = this.lessonState.results;
    Storage.saveProgress(progress);
    
    const isSuccess = Game.checkDayCompletion(this.lessonState.dayId);
    if (isSuccess) {
      Game.unlockNextDay();
      Game.showConfetti();
    }
    
    container.innerHTML = `
      <div class="lesson-complete fade-in">
        <h2>${isSuccess ? '¡Día Completado!' : 'Sigue practicando'}</h2>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="value">${correctCount}</span>
            <span class="label">Correctos</span>
          </div>
          <div class="stat-box">
            <span class="value">+${totalXP}</span>
            <span class="label">XP Ganado</span>
          </div>
        </div>
        <button class="btn primary full-width mt-4" onclick="window.location.hash='#home'">Volver al Inicio</button>
      </div>
    `;
  },

  renderMapView() {
    const progress = Storage.getProgress();
    const unlockedCount = progress.unlockedLocations.length;
    const totalCount = window.CiaoData.locations.length;
    
    document.getElementById('map-view').innerHTML = `
      <div class="map-header">
        <h2>Italia Explorada</h2>
        <p>${unlockedCount}/${totalCount} lugares desbloqueados</p>
      </div>
      <div id="map"></div>
    `;
    
    setTimeout(() => {
      if (!MapModule.getMap()) {
        MapModule.init('map');
      } else {
        MapModule.getMap().invalidateSize();
      }
      MapModule.updateMarkers(progress.unlockedLocations);
    }, 100);
  },

  renderProgressView() {
    const progress = Storage.getProgress();
    const levelInfo = Game.getLevel();
    const badges = Game.getBadges();
    
    document.getElementById('progress-view').innerHTML = `
      <div class="profile-header card">
        <div class="level-badge">${levelInfo.level}</div>
        <h2>${levelInfo.name}</h2>
        <div class="xp-bar-container mt-2">
          <div class="xp-bar" style="width: ${levelInfo.progress * 100}%"></div>
        </div>
        <p class="text-small text-center mt-1">${progress.xp} XP / ${levelInfo.maxXP === 999999 ? 'MAX' : levelInfo.maxXP + ' XP'}</p>
      </div>
      
      <h3>Tus Insignias</h3>
      <div class="badges-grid">
        ${badges.map(b => `
          <div class="badge-item ${b.earned ? 'earned' : 'locked'}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
            ${!b.earned ? `<div class="badge-hint text-small">${b.condition}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  renderSettingsView() {
    document.getElementById('settings-view').innerHTML = `
      <h2>Ajustes</h2>
      <div class="card mt-2">
        <h3>Voz</h3>
        <p class="text-small mb-2">Velocidad de pronunciación por defecto</p>
        <input type="range" id="speech-rate" min="0.5" max="1.5" step="0.1" value="0.85">
        
        <h3 class="mt-4">Datos</h3>
        <button class="btn outline full-width mb-2" onclick="App.exportData()">Exportar Progreso</button>
        <button class="btn outline full-width mb-4" onclick="document.getElementById('import-file').click()">Importar Progreso</button>
        <input type="file" id="import-file" style="display:none" onchange="App.importData(event)" accept=".json">
        
        <button class="btn outline danger full-width" onclick="App.resetData()">Borrar Todo el Progreso</button>
      </div>
    `;
  },

  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(Storage.exportProgress());
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "ciao_italia_backup.json");
    dlAnchorElem.click();
  },

  importData(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (Storage.importProgress(e.target.result)) {
          alert('Progreso importado con éxito');
          window.location.reload();
        } else {
          alert('Error al importar el archivo');
        }
      };
      reader.readAsText(file);
    }
  },

  resetData() {
    if (confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
      Storage.resetProgress();
      window.location.reload();
    }
  },

  dismissOnboarding() {
    const progress = Storage.getProgress();
    progress.settings.hasSeenOnboarding = true;
    Storage.saveProgress(progress);
    document.getElementById('onboarding').style.display = 'none';
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Mock data fallback if data.js is not loaded yet to prevent errors
  if (!window.CiaoData) {
    window.CiaoData = {
      days: [{id: 1, titleEs: 'Bienvenido', descriptionEs: 'Empecemos', exercises: [], icon: '👋'}],
      locations: [],
      dailyWords: [],
      dailyTips: []
    };
  }
  App.init();
});
