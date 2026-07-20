window.MapModule = {
  map: null,
  markers: {},
  
  init(containerId) {
    this.map = L.map(containerId, {
      zoomControl: false,
      tap: true
    }).setView([41.8719, 12.5674], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);
    
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  },
  
  updateMarkers(unlockedLocationIds) {
    if (!this.map || !window.CiaoData || !window.CiaoData.locations) return;
    
    Object.values(this.markers).forEach(m => m.remove());
    this.markers = {};
    
    window.CiaoData.locations.forEach(loc => {
      const isUnlocked = unlockedLocationIds.includes(loc.id);
      
      const iconHtml = isUnlocked ? 
        `<div class="map-icon unlocked">${loc.icon || '📍'}</div>` : 
        `<div class="map-icon locked">🔒</div>`;
        
      const customIcon = L.divIcon({
        className: 'custom-leaflet-icon',
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
      
      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon }).addTo(this.map);
      
      marker.on('click', () => {
        this.flyTo(loc.id);
        this.showLocationPopup(loc, isUnlocked);
      });
      
      this.markers[loc.id] = marker;
    });
  },
  
  flyTo(locationId) {
    const loc = window.CiaoData.locations.find(l => l.id === locationId);
    if (loc && this.map) {
      this.map.flyTo([loc.lat, loc.lng], 10, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  },
  
  showLocationPopup(loc, isUnlocked) {
    const marker = this.markers[loc.id];
    if (!marker) return;
    
    let content = '';
    
    if (isUnlocked) {
      content = `
        <div class="map-popup unlocked">
          <h3>${loc.icon || '📍'} ${loc.name}</h3>
          ${loc.nameEs && loc.nameEs !== loc.name ? `<p style="font-size:0.85rem;color:#888;">${loc.nameEs}</p>` : ''}
          <p class="desc">${loc.description}</p>
          
          ${loc.mustVisit && loc.mustVisit.length ? `
            <div class="popup-section">
              <h4>📍 Qué visitar:</h4>
              <ul>${loc.mustVisit.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          ` : ''}
          
          ${loc.hiddenGems && loc.hiddenGems.length ? `
            <div class="popup-section">
              <h4>💎 Joyas escondidas:</h4>
              <ul>${loc.hiddenGems.map(g => `<li><strong>${g.name || g}</strong>${g.description ? ` — ${g.description}` : ''}</li>`).join('')}</ul>
            </div>
          ` : ''}
          
          ${loc.funFacts && loc.funFacts.length ? `
            <div class="popup-section fun-facts">
              <h4>💡 Curiosidades:</h4>
              <ul>${loc.funFacts.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>
          ` : ''}

          ${loc.relatedVocabulary && loc.relatedVocabulary.length ? `
            <div class="popup-section">
              <h4>📝 Vocabulario:</h4>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${loc.relatedVocabulary.map(w => `<span style="background:#e8f5e9;padding:4px 10px;border-radius:12px;font-size:0.85rem;cursor:pointer;color:#1B6B3A" onclick="Speech.speak('${w}')">${w} 🔊</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      content = `
        <div class="map-popup locked">
          <h3>🔒 ${loc.name}</h3>
          <p class="lock-msg">🔒 Bloqueado — Se desbloquea completando el Día ${loc.unlockedByDay}</p>
          <div class="teaser">
            <p>${loc.description}</p>
          </div>
        </div>
      `;
    }
    
    marker.bindPopup(content, {
      maxWidth: 320,
      minWidth: 280,
      className: 'custom-popup',
      closeButton: true,
      autoPanPadding: [20, 60]
    }).openPopup();
  },
  
  highlightNewUnlock(locationId) {
    this.flyTo(locationId);
    setTimeout(() => {
      const loc = window.CiaoData.locations.find(l => l.id === locationId);
      if (loc) {
        this.showLocationPopup(loc, true);
        const icon = this.markers[locationId].getElement();
        if (icon) {
          icon.classList.add('highlight-pulse');
          setTimeout(() => icon.classList.remove('highlight-pulse'), 3000);
        }
      }
    }, 1500);
  },
  
  getMap() {
    return this.map;
  }
};
