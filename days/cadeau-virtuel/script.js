const gift = document.getElementById('gift');
const message = document.getElementById('message');

// Charger les données personnalisées
function loadPersonalization() {
  const personalization = JSON.parse(localStorage.getItem('personalization')) || {};
  const senderName = personalization.senderName || '??';
  const recipientName = personalization.recipientName || '??';
  
  // Mettre à jour le titre
  const title = document.getElementById('title');
  title.textContent = `🎁 Un cadeau pour ${recipientName} de ${senderName} 💕`;
  
  // Mettre à jour le message
  if (personalization.customMessages) {
    const msg = personalization.customMessages.find(m => m.day === 4);
    if (msg) {
      message.textContent = msg.message;
    }
  }
}

loadPersonalization();

gift.addEventListener('click', () => {
  if (message.classList.contains('hidden')) {
    message.classList.remove('hidden');
  } else {
    message.classList.add('hidden');
  }
});
