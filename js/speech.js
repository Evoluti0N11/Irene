window.Speech = {
  supported: {
    tts: 'speechSynthesis' in window,
    recognition: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  },
  isListening: false,
  onListeningChange: null,
  
  _setListeningState(state) {
    this.isListening = state;
    if (state) {
      document.body.classList.add('listening');
    } else {
      document.body.classList.remove('listening');
    }
    if (this.onListeningChange) {
      this.onListeningChange(state);
    }
  },

  // Best-effort name lists for classifying voices by gender, since the Web
  // Speech API doesn't expose gender as metadata. Covers the common Italian
  // voice names shipped by Chrome/Edge (Google) and Safari/iOS.
  voiceNameHints: {
    female: ['federica', 'alice', 'elsa', 'paola', 'isabella', 'valentina', 'female', 'donna', 'zira', 'samantha'],
    male: ['luca', 'diego', 'niccolò', 'niccolo', 'cosimo', 'giorgio', 'male', 'uomo', 'daniel', 'alex']
  },

  getPreferredVoice(lang = 'it-IT') {
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = lang.substring(0, 2).toLowerCase();
    const matching = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
    if (!matching.length) return null;

    const gender = (window.Storage && Storage.getProgress().settings.voiceGender) || 'female';
    if (gender === 'auto') return matching[0];

    const hints = this.voiceNameHints[gender] || [];
    const byName = matching.find(v => hints.some(h => v.name.toLowerCase().includes(h)));
    if (byName) return byName;

    // No name match: fall back to alternating so "male" and "female"
    // at least tend to pick different voices when several are available.
    if (gender === 'male' && matching.length > 1) return matching[1];
    return matching[0];
  },

  speak(text, lang = 'it-IT', rate = null) {
    return new Promise((resolve, reject) => {
      if (!this.supported.tts) {
        console.warn('TTS not supported');
        resolve();
        return;
      }
      
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate !== null ? rate : ((window.Storage && Storage.getProgress().settings.speechRate) || 0.85);
      
      const targetVoice = this.getPreferredVoice(lang);
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      utterance.onstart = () => document.body.classList.add('speaking');
      utterance.onend = () => {
        document.body.classList.remove('speaking');
        resolve();
      };
      utterance.onerror = (e) => {
        document.body.classList.remove('speaking');
        console.error('Speech error:', e);
        resolve();
      };
      
      window.speechSynthesis.speak(utterance);
    });
  },
  
  speakSlow(text) {
    const slowRate = ((window.Storage && Storage.getProgress().settings.speechRate) || 0.85) * 0.7;
    return this.speak(text, 'it-IT', slowRate);
  },
  
  startRecognition(targetLang = 'it-IT') {
    return new Promise((resolve, reject) => {
      if (!this.supported.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = targetLang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => this._setListeningState(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        resolve({ transcript, confidence });
      };
      
      recognition.onerror = (event) => {
        console.error('Recognition error', event.error);
        reject(new Error(event.error));
      };
      
      recognition.onend = () => {
        this._setListeningState(false);
      };
      
      this.recognition = recognition;
      recognition.start();
    });
  },
  
  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  },
  
  comparePronunciation(spoken, target) {
    const normalize = (str) => {
      return str.toLowerCase().replace(/[.,!?¡¿]/g, '').trim();
    };
    
    const spokenNorm = normalize(spoken);
    const targetNorm = normalize(target);
    
    if (spokenNorm === targetNorm) {
      return { score: 3, feedback: "¡Perfecto!", details: "Tu pronunciación fue exacta." };
    }
    
    const targetWords = targetNorm.split(/\s+/);
    const spokenWords = spokenNorm.split(/\s+/);
    
    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matches++;
    });
    
    const ratio = matches / targetWords.length;
    
    if (ratio >= 0.7) {
      return { score: 3, feedback: "¡Muy bien!", details: `Se entendió casi todo. Dijiste: "${spoken}"` };
    } else if (ratio >= 0.4) {
      return { score: 2, feedback: "Vas por buen camino.", details: `Trata de hablar más claro. Entendimos: "${spoken}"` };
    } else {
      return { score: 1, feedback: "No pudimos entenderte bien.", details: `Escuchamos: "${spoken}". Intenta de nuevo.` };
    }
  }
};

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
