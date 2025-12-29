## 📋 Guide d'Utilisation - Personnalisation du Calendrier

### 🎯 Flux Complet

#### **Première visite (Sans compte)**
1. **Ouverture de l'app** → Redirection automatique vers page de login
2. **Créer un compte** (`Sign Up`) :
   - Prénom
   - Nom  
   - Email
   - Mot de passe
3. **Confirmation** → Compte créé dans la base de données

#### **Après la première connexion**
1. **Redirection automatique** → Page de personnalisation (`personalize.html`)
2. **Remplir les informations** :
   - **👥 Nom du destinataire** : "Sarah", "Mon amour", etc.
   - **💌 Messages personnalisés** (optionnel) :
     - Sélectionner un jour (1-25)
     - Écrire un message spécial
     - Cliquer "+" pour ajouter plusieurs messages
   - **📸 Photos personnelles** (optionnel) :
     - Ajouter des photos en cliquant "+" 
     - Choisir depuis ton ordinateur
     - Jusqu'à 25 photos possible

#### **Lors de visites suivantes**
1. **Connexion** avec ton email/mot de passe
2. **Le calendrier s'affiche directement** avec :
   - Titre : "🎄 Calendrier pour [Nom] 🎄"
   - Photos de fond personnalisées sur les jours
   - Ton profil avec initiales dans le rond (haut droit)

### 🎮 Fonctionnalités du Calendrier

| Élément | Action |
|---------|--------|
| **Rond avec initiales** (haut droit) | Clic = Options de déconnexion |
| **Bouton ⚙️ (vert)** | Clic = Retour à la personnalisation |
| **Cases du calendrier** | Clic = Ouvre l'activité du jour |
| **Messages/Photos** | Affichés en arrière-plan des cases |

### 💾 Données Stockées

**localStorage (navigateur)** :
```
{
  currentUser: {
    email: "user@example.com",
    firstName: "Jean",
    lastName: "Dupont"
  },
  personalization: {
    recipientName: "Sarah",
    customMessages: [
      { day: 1, message: "Joyeuses fêtes!" }
    ],
    customPhotos: ["data:image/base64..."],
    createdAt: "2025-12-28T10:30:00Z"
  }
}
```

**MongoDB (optionnel, avec backend)** :
- Même structure mais persistée en base de données
- Accessible depuis n'importe quel appareil
- Sécurisé avec tokens JWT

### 🔒 Sécurité

- Mots de passe **hashés** avec bcrypt
- Sessions JWT de **30 jours**
- Données isolées par utilisateur
- Les photos sont encodées en **base64** (incluses dans la base)

### ❌ Erreurs Courantes

| Erreur | Solution |
|--------|----------|
| "Veuillez remplir tous les champs" | Complète le formulaire d'auth |
| "Un compte avec cet email existe déjà" | Utilise un autre email ou se connecter |
| "Les mots de passe ne correspondent pas" | Resaisis-les correctement |
| "Calendrier ne se personnalise pas" | Actualise la page ou vide le cache |

### 🚀 Améliorations Futures

- [ ] Éditer les photos/messages après création
- [ ] Supprimer des messages/photos individuels
- [ ] Thème sombre
- [ ] Partage de calendrier avec code
- [ ] Notifications à chaque nouveau jour
- [ ] Vidéos personnelles au lieu de photos

---

**L'app est prête à l'emploi avec localStorage !** 
Si tu installes Node.js + MongoDB, les données seront stockées en base de données.
