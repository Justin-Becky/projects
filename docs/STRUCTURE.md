# 📁 Structure du Projet - Organisation

## 📂 Arborescence

```
becky-projects/
├── 📄 index.html                 # Page principale du calendrier
├── 🎨 style.css                  # Styles globaux
├── 📜 script.js                  # Scripts principaux
├── 📦 package.json               # Dépendances Node.js
│
├── 📁 app/                       # Applications et pages
│   ├── 📁 login-signin/
│   │   ├── auth.html             # Page d'authentification
│   │   ├── auth-style.css
│   │   ├── auth-script.js
│   │   └── forms.html            # Formulaires login/signup
│   │
│   └── 📁 personalization/
│       ├── personalize.html      # Page de personnalisation
│       ├── personalize-style.css
│       └── personalize-script.js
│
├── 📁 days/                      # Tous les jours du calendrier (1-25)
│   ├── compteur/                 # Jour 1 - Temps ensemble
│   ├── cadeau-virtuel/           # Jour 2 - Cadeau virtuel
│   ├── playlist/                 # Jour 3 - Playlist Noël
│   ├── galerie-memoires/         # Jour 4 - Galerie de photos
│   ├── attrape-flocon/           # Jour 5 - Attrape-flocon
│   ├── meteo-amour/              # Jour 6 - Météo magique
│   ├── quiz-couple/              # Jour 7 - Quiz couple
│   ├── casse-tete/               # Jour 8 - Puzzle
│   ├── voyage/                   # Jour 9 - Prochain événement
│   ├── dessin-partage/           # Jour 10 - Dessin collaboratif
│   ├── coupon/                   # Jour 11 - Coupon cadeau
│   ├── etoiles-souhaits/         # Jour 12 - Boîte à vœux
│   ├── lanterne/                 # Jour 13 - Lanterne lumineuse
│   ├── chronologie/              # Jour 14 - Frise de souvenirs
│   ├── mots-doux/                # Jour 15 - Messages tendres
│   ├── lettre/                   # Jour 16 - Lettre personnalisée
│   ├── recette/                  # Jour 17 - Recette gourmande
│   ├── memory-game/              # Jour 18 - Jeu de mémoire
│   ├── points/                   # Jour 19 - Texte en particules
│   ├── carte-de-noel/            # Jour 20 - Carte de Noël
│   ├── cadeau-de-noel-1/         # Jour 21 - Cadeau Noël 1
│   ├── cadeau-de-noel-4/         # Jour 22 - Cadeau Noël 2
│   ├── sapin/                    # Jour 23 - Sapin interactif
│   ├── surprise-finale/          # Jour 24 - Surprise Noël
│   └── video-message/            # Jour 25 - Message vidéo
│
├── 📁 docs/                      # Documentation
│   ├── README.md                 # Présentation générale
│   ├── GUIDE_UTILISATION.md      # Guide utilisateur
│   ├── PERSONNALISATION_AVANCEE.md
│   ├── MONGODB_SETUP.md          # Installation MongoDB
│   ├── CHANGELOG.md              # Historique des modifications
│   └── LICENCE                   # Licence du projet
│
└── 📁 server/                    # Backend Node.js/Express (optionnel)
    ├── server.js                 # Serveur principal
    ├── .env.example              # Variables d'environnement
    ├── 📁 models/
    │   ├── User.js               # Modèle utilisateur MongoDB
    │   └── Personalization.js    # Modèle personnalisation
    └── 📁 routes/
        ├── auth.js               # Endpoints authentification
        └── personalization.js    # Endpoints personnalisation
```

---

## 🎯 Organisation des Dossiers

### **Racine** 
Les trois fichiers principaux restent à la racine :
- `index.html` - Page d'accueil du calendrier
- `style.css` - Styles globaux
- `script.js` - Logique principale

### **/app**
Contient les applications secondaires :
- **login-signin/** - Système d'authentification
- **personalization/** - Configuration du calendrier

### **/days**
Contient les 25 activités du calendrier, chacune dans son propre dossier :
- Chaque jour a : `index.html`, `style.css`, `script.js`
- Certains ont des dossiers supplémentaires (photos/, animation/, musique/)

### **/docs**
Toute la documentation :
- Guides utilisateur
- Guides d'installation
- Changelog et licence

### **/server**
Backend optionnel (à installer avec Node.js) :
- API REST avec Express
- Modèles de base de données MongoDB
- Routes d'authentification et de personnalisation

---

## 🔗 Chemins Relatifs

Depuis la racine :
```
app/login-signin/auth.html        ← Page de login
app/personalization/personalize.html ← Page de personnalisation
days/compteur/index.html          ← Jour 1
days/lettre/index.html            ← Jour 16
docs/README.md                    ← Documentation
server/server.js                  ← Backend
```

---

## 📝 Fichiers Principales à Modifier

- **index.html** - Structure du calendrier
- **script.js** - Logique du calendrier
- **style.css** - Styles du calendrier

Les autres fichiers sont organisés par fonction dans les dossiers correspondants.

---

**Structure créée le 28 décembre 2025** 🎄
