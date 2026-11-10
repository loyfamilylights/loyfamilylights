(() => {
  'use strict';
  const c = window.LOY_CONFIG || {};
  const $ = id => document.getElementById(id);
  const setText = (id, str) => { const el = $(id); if (el) el.textContent = String(str ?? ''); };
  const playlistFor = season => season === 'halloween' ? (c.halloweenPlaylist || []) : (c.playlist || []);
  const validHttp = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const parseDate = date => /^\d{4}-\d{2}-\d{2}$/.test(date || '') ? date : '';
  const todayInShowTZ = () => {
    try { return new Intl.DateTimeFormat('en-CA', { timeZone: c.timezone || 'America/Indiana/Indianapolis', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }
    catch { return new Date().toISOString().slice(0, 10); }
  };
  const formatDate = date => { const d = parseDate(date); if (!d) return ''; return new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }); };
  const daysUntil = (mm, dd) => {
    const date = todayInShowTZ(); const year = Number(date.slice(0,4));
    const today = Date.UTC(year, Number(date.slice(5,7))-1, Number(date.slice(8,10)));
    let target = Date.UTC(year, mm-1, dd);
    if (target < today) target = Date.UTC(year+1, mm-1, dd);
    return Math.round((target-today)/86400000);
  };
  let currentSeason = ['christmas', 'halloween'].includes(c.season) ? c.season : 'christmas';
  let liveSnapshot = null;
  let lightColor = 'pink'; let lightPattern = 'twinkle';
  const statusNames = {
    live: ['● Live Now', 'The lights are shining!', 'Enjoy the show! Follow our posted viewing guidelines.'],
    scheduled: ['● Scheduled', 'Holiday magic is on the way!', 'Please check show dates and times before visiting.'],
    paused: ['● Paused', 'The show is temporarily paused.', 'Check back for updates before you visit.'],
    cancelled: ['● Cancelled', 'Tonight’s show is cancelled.', 'Thanks for understanding. Please check again another night.'],
    offseason: ['● Off Season', 'See you next season!', 'We are working on more magic for the next holiday.']
  };
  function drawStatus() {
    const status = liveSnapshot?.status || c.status || 'scheduled';
    const details = statusNames[status] || statusNames.scheduled;
    const pill = $('statusPill'); pill.textContent = details[0]; pill.dataset.status = status;
    setText('statusHeading', details[1]); setText('statusDescription', details[2]);
    setText('lastUpdated', liveSnapshot?.updatedAt ? `Status feed updated: ${new Date(liveSnapshot.updatedAt).toLocaleString()}` : 'Status is manually configured; not a live FPP connection.');
    const current = liveSnapshot?.nowPlaying;
    if (current && status === 'live') {
      setText('featuredTitle', current);
      setText('featuredArtist', 'Live show feed');
      setText('nowNotice', 'Now playing · From configured status feed');
      setText('upNext', liveSnapshot?.upNext ? `Up next: ${liveSnapshot.upNext}` : '');
    } else {
      const songs = playlistFor(currentSeason);
      setText('featuredTitle', songs[0]?.title || 'Songs coming soon');
      setText('featuredArtist', songs[0]?.artist || 'Loy Family Lights');
      setText('nowNotice', 'Featured playlist preview — not live playback');
      setText('upNext', '');
    }
  }
  function drawPlaylist() {
    const list = $('playlistList'); list.replaceChildren();
    const songs = playlistFor(currentSeason);
    songs.forEach(song => {
      const row = document.createElement('div'); row.className = 'song-row';
      const icon = document.createElement('span'); icon.className = 'song-icon'; icon.textContent = song.icon || '♫';
      const content = document.createElement('div');
      const title = document.createElement('h4'); title.textContent = song.title || 'Untitled';
      const artist = document.createElement('p'); artist.textContent = song.artist || 'Loy Family Lights';
      content.append(title, artist);
      const mood = document.createElement('span'); mood.className = 'song-mood'; mood.textContent = song.mood || 'Show Music';
      row.append(icon, content, mood); list.appendChild(row);
    });
    const select = $('favoriteSelect'); select.replaceChildren();
    for (const song of songs) { const opt = document.createElement('option'); opt.value = song.title; opt.textContent = song.title; select.appendChild(opt); }
    const saved = localStorage.getItem('loy-favorite-' + currentSeason);
    if (saved && songs.some(song => song.title === saved)) select.value = saved;
    setText('favoriteMessage', saved ? 'Saved on this device: ' + saved : '');
    drawStatus();
  }
  function drawCountdown() {
    const halloween = currentSeason === 'halloween';
    const days = halloween ? daysUntil(10, 31) : daysUntil(12, 25);
    setText('countDays', days); setText('kidCountdown', days === 0 ? 'It’s the big day!' : `${days} days to go!`);
    setText('countLabel', halloween ? 'DAYS TO HALLOWEEN' : 'DAYS TO CHRISTMAS');
  }
  function drawSeason() {
    document.body.dataset.season = currentSeason;
    const button = $('themeToggle');
    button.textContent = currentSeason === 'christmas' ? '🎃 Halloween' : '🎄 Christmas';
    button.setAttribute('aria-label', `Switch to ${currentSeason === 'christmas' ? 'Halloween' : 'Christmas'} theme`);
    setText('heroTagline', currentSeason === 'halloween'
      ? 'Join us for a spooktacular celebration of synchronized lights, music, and family-friendly Halloween fun.'
      : 'Experience a spectacular celebration of synchronized lights, music, and holiday wonder, all from the comfort of your car.');
    drawPlaylist(); drawCountdown();
  }
  function drawSettings() {
    setText('announcementText', c.announcement || 'Welcome to Loy Family Lights!');
    setText('stationText', c.station || 'Tune in on-site');
    setText('locationText', c.locationLabel || 'Location coming soon');
    if (parseDate(c.seasonStart) && parseDate(c.seasonEnd)) setText('scheduleDates', `${formatDate(c.seasonStart)} – ${formatDate(c.seasonEnd)} · Hours are subject to weather.`);
    const hours = $('scheduleTimes'); hours.replaceChildren();
    for (const item of (c.schedule || [])) {
      const block = document.createElement('div');
      const days = document.createElement('b'); days.textContent = item.days || '';
      const time = document.createElement('span'); time.textContent = item.time || '';
      block.append(days, time); hours.appendChild(block);
    }
    if (c.address) {
      const link = $('directionsLink'); link.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.address); link.hidden = false;
      setText('addressNotice', c.address);
    }
    const socials = $('socialLinks');
    for (const [key,label] of [['facebookUrl','Facebook'],['youtubeUrl','YouTube'],['instagramUrl','Instagram'],['donationUrl','Support Us']]) {
      const href = validHttp(c[key]); if (!href) continue;
      const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = label; socials.appendChild(a);
    }
    const rf = validHttp(c.remoteFalconUrl);
    const request = $('requestBtn');
    if (rf) { request.href = rf; request.target = '_blank'; request.rel = 'noopener noreferrer'; request.textContent = '♡  Request a Song'; }
    else { request.href = '#music'; request.textContent = '♡  Requests Coming Soon'; request.setAttribute('aria-disabled', 'true'); request.addEventListener('click', e => e.preventDefault()); }
    setText('year', new Date().getFullYear());
  }
  function drawBulbs() {
    const el = $('miniBulbs'); el.replaceChildren(); el.dataset.pattern = lightPattern;
    const colors = {pink:'#ff5c72',gold:'#ffd66a',green:'#4edcb4',blue:'#83caff'};
    for (let i=0;i<15;i++) {
      const bulb = document.createElement('span'); bulb.className = 'bulb';
      bulb.style.setProperty('--light',lightColor === 'rainbow' ? Object.values(colors)[i % 4] : colors[lightColor]);
      if (lightPattern === 'twinkle') bulb.style.animationDelay = `${(i % 5)*.19}s`;
      el.appendChild(bulb);
    }
  }
  async function readStatusFeed() {
    const url = validHttp(c.statusJsonUrl) || ((c.statusJsonUrl || '').startsWith('data/') ? c.statusJsonUrl : '');
    if (!url) return;
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid data');
      // Prevent stale feeds from accidentally advertising a show as live indefinitely.
      const timestamp = Date.parse(data.updatedAt);
      const maxAgeMs = Math.max(30, Number(c.statusRefreshSeconds) || 60) * 1000 * 5;
      if (!Number.isFinite(timestamp) || Math.abs(Date.now() - timestamp) > maxAgeMs) throw new Error('Stale feed');
      liveSnapshot = {
        status: statusNames[data.status] ? data.status : 'scheduled',
        nowPlaying: String(data.nowPlaying || '').slice(0, 120),
        upNext: String(data.upNext || '').slice(0, 120),
        updatedAt: data.updatedAt
      };
    } catch (err) { liveSnapshot = null; setText('lastUpdated', 'Status feed unavailable; showing configured schedule.'); }
    drawStatus();
  }
  const menuButton = document.querySelector('.menu-toggle');
  menuButton.addEventListener('click', () => { const open = $('siteNav').classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('#siteNav a').forEach(a => a.addEventListener('click', () => { $('siteNav').classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));
  $('themeToggle').addEventListener('click', () => { currentSeason = currentSeason === 'christmas' ? 'halloween' : 'christmas'; drawSeason(); });
  document.querySelectorAll('.swatch').forEach(btn => btn.addEventListener('click', () => {
    lightColor = btn.dataset.color;
    document.querySelectorAll('.swatch').forEach(x => { x.classList.toggle('active', x === btn); x.setAttribute('aria-pressed',String(x === btn)); });
    drawBulbs();
  }));
  document.querySelectorAll('[data-pattern]').forEach(btn => { if (!btn.classList.contains('small-btn')) return; btn.addEventListener('click', () => {
    lightPattern = btn.dataset.pattern;
    document.querySelectorAll('.pattern-row .small-btn').forEach(x => x.classList.toggle('selected', x === btn));
    drawBulbs();
  }); });
  $('favoriteSave').addEventListener('click', () => {
    const favorite = $('favoriteSelect').value;
    if (!favorite) return;
    try { localStorage.setItem('loy-favorite-' + currentSeason, favorite); setText('favoriteMessage', 'Saved on this device: ' + favorite); }
    catch { setText('favoriteMessage', 'Your browser did not allow saving this choice.'); }
  });
  drawSettings(); drawSeason(); drawBulbs();
  if (c.statusJsonUrl) { readStatusFeed(); window.setInterval(readStatusFeed, Math.max(30, Number(c.statusRefreshSeconds) || 60) * 1000); }
  window.setInterval(drawCountdown, 60 * 60 * 1000);
})();
