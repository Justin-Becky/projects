// Animation simple pour la météo
const weatherIcon = document.getElementById('weatherIcon');
const icons = ['❄️', '🌨️', '☃️', '❄️'];
let currentIcon = 0;

setInterval(() => {
  currentIcon = (currentIcon + 1) % icons.length;
  weatherIcon.textContent = icons[currentIcon];
}, 2000);

