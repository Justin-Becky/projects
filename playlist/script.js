const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const vinyl = document.querySelector('.vinyl');
const playlistItems = document.querySelectorAll('.playlist-item');
const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Configuration des pistes avec des musiques de Noël
// Placez vos fichiers .mp3 dans le dossier playlist/ et utilisez le nom du fichier
const tracks = [
  { 
    title: "🎬 You're a Mean One, Mr. Grinch", 
    artist: "Thurl Ravenscroft",
    url: "musique/1.mp3"  // Placez votre fichier dans le dossier playlist/
  },
  { 
    title: "🎄 Jingle Bells", 
    artist: "Chanson traditionnelle",
    url: "musique/2.mp3"  // Placez votre fichier dans le dossier playlist/
  },
  { 
    title: "❄️ Let It Snow", 
    artist: "Chanson de Noël",
    url: "musique/3.mp3"  // Placez votre fichier dans le dossier playlist/
  },
  { 
    title: "🎁 All I Want for Christmas Is You", 
    artist: "Mariah Carey",
    url: "musique/4.mp3"  // Placez votre fichier dans le dossier playlist/
  },
  { 
    title: "⭐ Silent Night", 
    artist: "Chanson traditionnelle",
    url: "musique/5.mp3"  // Placez votre fichier dans le dossier playlist/
  },
];

let currentTrack = 0;
let isPlaying = false;

// Fonction pour formater le temps (mm:ss)
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Charger une piste
function loadTrack(index) {
  const track = tracks[index];
  if (track && track.url) {
    audioPlayer.src = track.url;
    audioPlayer.load();
    updateTrack();
  }
}

// Mettre à jour l'affichage de la piste
function updateTrack() {
  const track = tracks[currentTrack];
  if (track) {
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    playlistItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentTrack);
    });
  }
}

// Mettre à jour la barre de progression
function updateProgress() {
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = progressPercent + '%';
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
}

// Mettre à jour la durée totale
audioPlayer.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audioPlayer.duration);
});

// Mettre à jour la progression pendant la lecture
audioPlayer.addEventListener('timeupdate', updateProgress);

// Quand la piste se termine, passer à la suivante
audioPlayer.addEventListener('ended', () => {
  nextTrack();
});

// Gérer la lecture/pause
function togglePlay() {
  if (audioPlayer.src) {
    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
      playBtn.textContent = '▶';
      vinyl.classList.remove('playing');
    } else {
      audioPlayer.play().catch(error => {
        console.error("Erreur de lecture:", error);
        alert("Impossible de lire la musique. Vérifiez que le fichier audio existe dans le dossier playlist/ et que le nom correspond.");
      });
      isPlaying = true;
      playBtn.textContent = '⏸';
      vinyl.classList.add('playing');
    }
  } else {
    // Si aucune piste n'est chargée, charger la première
    loadTrack(currentTrack);
    togglePlay();
  }
}

// Piste précédente
function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Piste suivante
function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Cliquer sur la barre de progression pour changer la position
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Événements des boutons
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Cliquer sur un élément de la playlist
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentTrack = index;
    loadTrack(currentTrack);
    if (!isPlaying) {
      togglePlay();
    } else {
      audioPlayer.play();
    }
  });
});

// Charger la première piste au démarrage
loadTrack(currentTrack);

