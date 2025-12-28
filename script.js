const days = document.querySelectorAll('.day');

// Tableau des projets - tous les jours ouvrent un projet
const projects = {
  1: "compteur/index.html",
  2: "cadeau-virtuel/index.html",
  3: "playlist/index.html",
  4: "galerie-memoires/index.html",
  5: "attrape-flocon/index.html",
  6: "meteo-amour/index.html",
  7: "quiz-couple/index.html",
  8: "casse-tete/index.html",
  9: "voyage/index.html",
  10: "dessin-partage/index.html",
  11: "coupon/index.html",
  12: "etoiles-souhaits/index.html",
  13: "lanterne/index.html",
  14: "chronologie/index.html",
  15: "mots-doux/index.html",
  16: "lettre/index.html",
  17: "recette/index.html",
  18: "memory-game/index.html",
  19: "points/index.html",
  20: "carte-de-noel/index.html",
  21: "cadeau-de-noel-1/index.html",
  22: "cadeau-de-noel-4/index.html",
  23: "sapin/index.html",
  24: "surprise-finale/index.html"
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

