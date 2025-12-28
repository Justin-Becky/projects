const gift = document.getElementById('gift');
const message = document.getElementById('message');

gift.addEventListener('click', () => {
  if (message.classList.contains('hidden')) {
    message.classList.remove('hidden');
  } else {
    message.classList.add('hidden');
  }
});
