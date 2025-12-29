const fireworks = document.getElementById('fireworks');
const hearts = document.getElementById('hearts');

// Charger les données personnalisées
function loadPersonalization() {
  const personalization = JSON.parse(localStorage.getItem('personalization')) || {};
  const senderName = personalization.senderName || 'Justin';
  const recipientName = personalization.recipientName || 'Becky';
  
  document.getElementById('title').textContent = `🎉 Joyeux Noël ${recipientName} ! 🎉`;
  document.getElementById('message').textContent = `💜 Avec tout mon amour – ${senderName} 💜`;
}

loadPersonalization();

const colors = ['#ff4081', '#ff6b6b', '#ffd700', '#4caf50', '#2196f3', '#9c27b0'];

function createFirework(x, y) {
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = (Math.PI * 2 * i) / 30;
    const distance = 100 + Math.random() * 50;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    firework.style.setProperty('--end-x', endX + 'px');
    firework.style.setProperty('--end-y', endY + 'px');
    
    fireworks.appendChild(firework);
    
    setTimeout(() => firework.remove(), 1000);
  }
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💕';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
  hearts.appendChild(heart);
  
  setTimeout(() => heart.remove(), 3000);
}

// Créer des feux d'artifice aléatoires
setInterval(() => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  createFirework(x, y);
}, 500);

// Créer des cœurs qui montent
setInterval(() => {
  createHeart();
}, 300);

// Feux d'artifice au clic
document.addEventListener('click', (e) => {
  createFirework(e.clientX, e.clientY);
});

