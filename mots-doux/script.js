const messageDisplay = document.getElementById('messageDisplay');
const message = document.getElementById('message');
const generateBtn = document.getElementById('generateBtn');
const hearts = document.getElementById('hearts');

const messages = [
  "🌟 Tu es mon plus beau cadeau.",
  "💜 Je t'aime plus chaque jour",
  "🎄 Chaque instant avec toi est un cadeau précieux.",
  "⭐ Chaque étoile me rappelle un moment partagé avec toi.",
  "🎁 Je t'offre mon amour, emballé de mille étoiles. ✨",
  "😂 Ton rire est la plus belle chanson de Noël. 🎶",
  "❄️🌟 Tu es mon miracle de Noël le plus doux. 🌟❄️",
  "💕 Tu remplis mon cœur de joie chaque jour",
  "🌙 Tu es ma lumière dans l'obscurité",
  "🌈 Avec toi, chaque jour est une aventure",
  "🦋 Tu me fais voler plus haut que les nuages",
  "🌺 Tu es la fleur la plus belle de mon jardin",
  "🎈 Tu apportes de la couleur dans ma vie",
  "🍀 Tu es ma chance, mon trésor",
  "🌊 Tu es l'océan de mon bonheur"
];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💕';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
  hearts.appendChild(heart);
  
  setTimeout(() => heart.remove(), 3000);
}

generateBtn.addEventListener('click', () => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  message.textContent = randomMessage;
  
  // Créer plusieurs cœurs
  for (let i = 0; i < 10; i++) {
    setTimeout(() => createHeart(), i * 100);
  }
});

