const days = document.querySelectorAll('.day');
const userAvatar = document.getElementById('user-avatar');
const avatarText = document.getElementById('avatar-text');

// Vérifier la connexion et la personnalisation au chargement
window.addEventListener('load', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const personalization = JSON.parse(localStorage.getItem('personalization'));
  
  // Si pas de user, rediriger vers login
  if (!currentUser) {
    window.location.href = 'app/login-signin/auth.html';
    return;
  }
  
  // Si user mais pas de personnalisation, rediriger vers setup
  if (!personalization) {
    window.location.href = 'app/personalization/personalize.html';
    return;
  }
  
  // Sinon, initialiser l'avatar et la page
  initializeAvatar();
  initializeCalendar();
});

// Initialiser l'avatar au chargement de la page
function initializeAvatar() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const personalization = JSON.parse(localStorage.getItem('personalization'));
  
  if (currentUser) {
    // Utilisateur connecté - afficher les initiales en majuscule
    const firstName = currentUser.firstName.charAt(0).toUpperCase();
    const lastName = currentUser.lastName.charAt(0).toUpperCase();
    avatarText.textContent = firstName + lastName;
  }
}

// Initialiser le calendrier avec les données personnalisées
function initializeCalendar() {
  const personalization = JSON.parse(localStorage.getItem('personalization'));
  
  // Mettre à jour le titre si besoin
  const h1 = document.querySelector('h1');
  if (personalization && personalization.recipientName) {
    h1.textContent = `🎄 Calendrier pour ${personalization.recipientName} 🎄`;
  }
  
  // Ajouter les messages et photos personnalisés sur les jours
  if (personalization) {
    // Ajouter les photos personnalisées
    if (personalization.customPhotos && personalization.customPhotos.length > 0) {
      personalization.customPhotos.forEach((photoData, index) => {
        const dayElement = document.querySelector(`[data-day="${index + 1}"]`);
        if (dayElement && photoData) {
          const img = document.createElement('img');
          img.src = photoData;
          img.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
            opacity: 0.5;
            z-index: 1;
          `;
          dayElement.appendChild(img);
          dayElement.style.position = 'relative';
          dayElement.style.zIndex = '2';
        }
      });
    }
  }
}

// Gérer le clic sur l'avatar
userAvatar.addEventListener('click', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser) {
    // Utilisateur connecté - afficher menu de déconnexion
    const confirmed = confirm(`Vous êtes connecté en tant que ${currentUser.firstName} ${currentUser.lastName}. Voulez-vous vous déconnecter ?`);
    if (confirmed) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('personalization');
      window.location.href = 'app/login-signin/auth.html';
    }
  }
});

// Bouton éditer personnalisation
document.getElementById('edit-personalization-btn').addEventListener('click', function() {
  window.location.href = 'app/personalization/personalize.html';
});

// Tableau des projets - tous les jours ouvrent un projet
const projects = {
  1: "days/compteur/index.html",
  2: "days/cadeau-virtuel/index.html",
  3: "days/playlist/index.html",
  4: "days/galerie-memoires/index.html",
  5: "days/attrape-flocon/index.html",
  6: "days/meteo-amour/index.html",
  7: "days/quiz-couple/index.html",
  8: "days/casse-tete/index.html",
  9: "days/voyage/index.html",
  10: "days/dessin-partage/index.html",
  11: "days/coupon/index.html",
  12: "days/etoiles-souhaits/index.html",
  13: "days/lanterne/index.html",
  14: "days/chronologie/index.html",
  15: "days/mots-doux/index.html",
  16: "days/lettre/index.html",
  17: "days/recette/index.html",
  18: "days/memory-game/index.html",
  19: "days/points/index.html",
  20: "days/carte-de-noel/index.html",
  21: "days/cadeau-de-noel-1/index.html",
  22: "days/cadeau-de-noel-4/index.html",
  23: "days/sapin/index.html",
  24: "days/surprise-finale/index.html"
};

days.forEach(day => {
  day.addEventListener('click', () => {
    const number = day.getAttribute('data-day');
    const project = projects[number];
    if (project) {
      // Ouvre le projet dans un nouvel onglet
      window.open(project, "_blank");
    }
  });
});

