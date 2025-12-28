const playButton = document.getElementById('playButton');
const videoContent = document.getElementById('videoContent');
const replayBtn = document.getElementById('replayBtn');

playButton.addEventListener('click', () => {
  playButton.style.display = 'none';
  videoContent.classList.remove('hidden');
  replayBtn.classList.remove('hidden');
});

replayBtn.addEventListener('click', () => {
  playButton.style.display = 'flex';
  videoContent.classList.add('hidden');
  replayBtn.classList.add('hidden');
  
  // Réinitialiser les animations
  const messageTexts = document.querySelectorAll('.message-text');
  messageTexts.forEach((text, index) => {
    text.style.animation = 'none';
    setTimeout(() => {
      text.style.animation = `fadeInUp 0.8s ease ${index * 0.3}s both`;
    }, 10);
  });
});

