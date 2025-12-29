const paper = document.getElementById('paper');

// Charger les données personnalisées
function loadPersonalization() {
  const personalization = JSON.parse(localStorage.getItem('personalization')) || {};
  const senderName = personalization.senderName || '??';
  const recipientName = personalization.recipientName || '??';
  
  // Mettre à jour le titre
  const title = document.getElementById('title');
  title.textContent = ` Surprise pour toi ${recipientName} `;
  
  // Mettre à jour le message personnalisé si présent
  if (personalization.customMessages) {
    const msg = personalization.customMessages.find(m => m.day === 16);
    if (msg) {
      document.getElementById('message1').textContent = msg.message;
    }
  }
  
  // Mettre à jour la signature
  document.getElementById('message2').textContent = `Je t'aime ${recipientName}`;
  document.getElementById('message3').textContent = `${senderName}, Avec tout mon amour`;
}

loadPersonalization();

let startY = 0;
let moved = false;

paper.addEventListener('pointerdown', (e) => {
  startY = e.clientY || e.touches?.[0]?.clientY || 0;
  moved = false;
});

paper.addEventListener('pointermove', (e) => {
  const y = e.clientY || e.touches?.[0]?.clientY || 0;
  if (Math.abs(y - startY) > 10) {
    moved = true; // on considère que c'est un scroll
  }
});

paper.addEventListener('pointerup', () => {
  if (!moved) {
    paper.classList.toggle('open');
  }
});
