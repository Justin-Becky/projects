# 🎄 Setup MongoDB et Backend

## 🚀 Installation

### 1. **Installer Node.js** 
Télécharge et installe [Node.js](https://nodejs.org/) (version 16+)

### 2. **Installer les dépendances**
```bash
cd c:\Users\justi\projet-test\projects
npm install
```

### 3. **Configurer MongoDB**

#### Option A : MongoDB Atlas (Cloud gratuit) - **RECOMMANDÉ**
1. Va sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crée un compte gratuit
3. Crée un cluster gratuit
4. Copie la chaîne de connexion
5. Crée un fichier `.env` dans le dossier `server/` :
```
MONGODB_URI=mongodb+srv://ton-username:ton-password@ton-cluster.mongodb.net/becky-projects
JWT_SECRET=une-clé-secrète-très-longue-et-aléatoire
PORT=5000
NODE_ENV=development
```

#### Option B : MongoDB Locale
```bash
# Télécharge et installe MongoDB Community Edition
# Puis lance le service MongoDB

# Dans .env :
MONGODB_URI=mongodb://localhost:27017/becky-projects
```

### 4. **Lancer le serveur**
```bash
npm start
```

Ou en mode développement avec rechargement automatique :
```bash
npm run dev
```

Le serveur doit afficher : `🚀 Serveur lancé sur http://localhost:5000`

## 📁 Architecture

```
becky-projects/
├── public/                 # Fichiers front-end (HTML, CSS, JS)
│   ├── index.html
│   ├── personalize.html
│   ├── login-signin/
│   ├── script.js
│   └── ...
├── server/                 # Backend Node.js/Express
│   ├── server.js           # Point d'entrée
│   ├── models/
│   │   ├── User.js         # Modèle utilisateur
│   │   └── Personalization.js
│   ├── routes/
│   │   ├── auth.js         # Endpoints auth
│   │   └── personalization.js
│   └── .env               # Variables d'environnement
├── package.json
└── ...
```

## 🔌 API Endpoints

### Authentification (`/api/auth`)
- `POST /signup` - Créer un compte
- `POST /login` - Se connecter
- `GET /me` - Récupérer les infos du user

### Personnalisation (`/api/personalization`)
- `POST /save` - Sauvegarder personnalisation
- `GET /me` - Récupérer personnalisation
- `DELETE /me` - Supprimer personnalisation

## 🔄 Flux d'utilisation

1. **Utilisateur ouvre l'app** → Redirigé vers `login-signin/auth.html`
2. **Login/Signup** → Crée un user dans MongoDB
3. **Redirection automatique** → `personalize.html`
4. **Personnalisation** :
   - Entre le nom du destinataire
   - Ajoute des photos (max 25)
   - Ajoute des messages personnalisés
5. **Sauvegarde** → Données stockées dans MongoDB
6. **Calendrier** → Affiche le nom + messages/photos personnalisés

## 💾 Structure des données MongoDB

### Collection Users
```javascript
{
  _id: ObjectId,
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean@example.com",
  password: "hashed-password",
  personalizations: [ObjectId],
  createdAt: Date
}
```

### Collection Personalizations
```javascript
{
  _id: ObjectId,
  user: ObjectId,
  recipientName: "Sarah",
  customMessages: [
    { day: 1, message: "Joyeuses fêtes!" },
    { day: 5, message: "Je t'aime" }
  ],
  customPhotos: [
    { day: 2, imageData: "base64-image-string" },
    { day: 10, imageData: "base64-image-string" }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠 Problèmes courants

### MongoDB ne se connecte pas
- Vérifie la chaîne MONGODB_URI dans `.env`
- Vérifie que le cluster MongoDB Atlas est actif
- Ajoute ton IP à la liste d'accès white list

### Erreur "npm: command not found"
- Réinstalle Node.js complètement
- Redémarre le terminal

### Port 5000 déjà utilisé
- Change le PORT dans `.env` (ex: 5001)
- Ou tue le processus : `netstat -ano | findstr :5000`

## 📝 Notes

- Le localStorage fonctionne offline (données locales)
- MongoDB stocke les données de manière persistante
- Les images sont encodées en base64 (jusqu'à 16MB par document)
- Les sessions JWT durent 30 jours

## 🚀 Déploiement futur

Pour déployer en production, utilise :
- **Frontend** : Vercel, Netlify, GitHub Pages
- **Backend** : Heroku, Railway, Render
- **Base de données** : MongoDB Atlas (gratuit jusqu'à 512MB)
