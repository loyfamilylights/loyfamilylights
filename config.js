/** Edit this file to personalize your GitHub Pages website. */
window.LOY_CONFIG = {
  showName: 'Loy Family Lights',
  tagline: 'Where music meets the magic of lights',
  station: 'Tune in on-site', // Example: '88.1 FM' (set only your actual licensed/use frequency)
  locationLabel: 'Ligonier, Indiana',
  address: '', // Optional public viewing address; used to enable Directions
  timezone: 'America/Indiana/Indianapolis',
  season: 'christmas', // 'christmas' or 'halloween'
  status: 'scheduled', // 'scheduled', 'live', 'paused', 'cancelled', 'offseason'
  announcement: 'Welcome to Loy Family Lights! Enjoy the music, stay in your vehicle, and please be respectful of our neighbors.',
  schedule: [
    { days: 'Sun–Thu', time: '6:00–9:00 PM' },
    { days: 'Fri–Sat', time: '6:00–10:00 PM' }
  ], // EXAMPLE HOURS: replace with your actual schedule before publishing
  seasonStart: '2026-11-27',
  seasonEnd: '2026-12-31',
  remoteFalconUrl: '', // Your publicly available Remote Falcon visitor page URL
  livestreamUrl: '', // YouTube live stream or another public video URL
  donationUrl: '',
  facebookUrl: '',
  youtubeUrl: '',
  instagramUrl: '',
  contactEmail: '',
  playlist: [
    { title: 'The Bells of Christmas Thunder', artist: 'Loy Family Lights Original', mood: 'Symphonic Rock', icon: '🔔' },
    { title: 'The Greatest Night of the Year', artist: 'Loy Family Lights Original', mood: 'Holiday Anthem', icon: '✨' },
    { title: 'Do We Really Need More Lights?', artist: 'Loy Family Lights Original', mood: 'Christmas Rock', icon: '🎸' },
    { title: 'Christmas Magic', artist: 'Holiday Mix', mood: 'Festive', icon: '🎄' }
  ],
  halloweenPlaylist: [
    { title: 'Night of the Jack-O’-Lanterns', artist: 'Loy Family Lights Original', mood: 'Haunted Carnival', icon: '🎃' },
    { title: 'March of the Pumpkin King', artist: 'Loy Family Lights Original', mood: 'Halloween Anthem', icon: '👑' }
  ],
  // Optional: provide your own same-origin/public JSON snapshot, e.g. 'data/show-status.json'.
  // Expected shape: { "status":"live", "nowPlaying":"Song title", "upNext":"Song title", "updatedAt":"2026-12-01T18:00:00-05:00" }
  statusJsonUrl: '',
  statusRefreshSeconds: 60
};
