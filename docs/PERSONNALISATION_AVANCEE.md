## 🎁 Personnalisation Avancée - Nouvelles Cases Dynamiques

### 📝 Quels champs ajouter dans la personnalisation ?

Lors de la première utilisation, vous devez remplir :

1. **👤 Ton nom (celui qui envoie)**
   - Exemple: "Justin"
   - Utilisé dans les signatures et titres

2. **👤 Nom du destinataire**
   - Exemple: "Sarah"
   - Personnalise tous les messages

3. **📅 Date de votre rencontre**
   - Format: YYYY-MM-DD
   - Affichée dans la **Case 1** (Compteur)

4. **📅 Prochain événement important**
   - Nom: "Mariage", "Voyage à Hawaï", "Anniversaire"
   - Date: YYYY-MM-DD
   - Utilisé dans la **Case 9** (Voyage/Compteur)

5. **💌 Messages personnalisés (optionnel)**
   - Jour 4, 16, et autres
   - Remplacent le texte par défaut

6. **📸 Photos personnelles (optionnel)**
   - Jusqu'à 25 photos
   - Affichées en arrière-plan des cases

---

### 🎄 Cases Dynamiques Personnalisées

| Case | Éléments Personnalisés | Défaut si vide |
|------|------------------------|---|
| **1** (Compteur) | Date de rencontre, noms des deux personnes | 7 juin 2024 |
| **4** (Cadeau virtuel) | Noms de l'expéditeur et du destinataire + message custom jour 4 | Texte par défaut |
| **8** (Casse-tête) | Noms de l'expéditeur et du destinataire | "A puzzle for you my love" |
| **9** (Voyage) | Nom et date de l'événement | 13 janvier (Guadeloupe) |
| **16** (Lettre) | Noms + Message custom jour 16 | Texte par défaut |
| **19** (Points/Texte) | Texte personnalisé avec les noms | "I Love you Becky" |
| **20** (Carte Noël) | Noms de l'expéditeur et du destinataire | "Becky" et "Ju" |
| **24** (Surprise Finale) | Noms de l'expéditeur et du destinataire | "Becky" et "Justin" |

---

### 📊 Stockage des Données

**Structure localStorage** :
```javascript
{
  personalization: {
    senderName: "Justin",
    recipientName: "Sarah",
    meetingDate: "2024-06-07",  // YYYY-MM-DD
    nextEventName: "Mariage",
    nextEventDate: "2025-07-15",
    customMessages: [
      { day: 4, message: "Mon amour..." },
      { day: 16, message: "Je t'aime..." }
    ],
    customPhotos: ["data:image/base64..."],
    createdAt: "2025-12-28T10:30:00Z"
  }
}
```

---

### 🎨 Cas d'Usage Exemples

#### **Scénario 1 : Calendrier pour sa petite amie**
- **Sender:** Justin
- **Recipient:** Sarah
- **Meeting Date:** 2024-03-15
- **Next Event:** Mariage à la montagne le 2025-06-20
- **Messages:** Messages doux pour les jours 4 et 16
- **Photos:** 5 photos de couple

**Résultat:**
- Case 1: "Sarah et Justin sont ensemble depuis 15 mars 2024"
- Case 4: "Un cadeau pour Sarah de Justin"
- Case 9: "Mariage à la montagne" compte à rebours jusqu'au 20 juin 2025
- Case 16: Message personnalisé

#### **Scénario 2 : Calendrier pour un enfant**
- **Sender:** Maman
- **Recipient:** Lucas
- **Meeting Date:** (date de naissance)
- **Next Event:** Anniversaire le 2025-08-10
- **Photos:** Photos du bébé qui grandit

---

### ⚙️ Si vous n'entrez rien

Les valeurs par défaut sont affichées :
- Noms → **??**
- Date → **Par défaut du code**
- Messages → **Textes originaux du calendrier**
- Photos → **Pas d'images personnalisées**

---

### 🔄 Modification après création

Cliquez sur le **bouton ⚙️ (vert)** en haut à droite pour :
- Modifier les noms
- Ajouter/Éditer les messages
- Ajouter des photos
- Changer la date de l'événement

Les modifications se sauvegardent automatiquement dans localStorage.

---

### 💾 Sauvegarde Permanente (Optionnel)

Si tu installes **Node.js + MongoDB** :
- Les données seront stockées en base de données
- Accessibles de n'importe quel appareil/navigateur
- Synchronisation automatique
- Voir : `MONGODB_SETUP.md`

---

### 🐛 Troubleshooting

| Problème | Solution |
|----------|----------|
| Les noms ne s'affichent pas | Rafraîchis la page ou vide le cache |
| Les dates ne fonctionnent pas | Utilise le format YYYY-MM-DD (ex: 2025-06-15) |
| Les photos ne s'affichent pas | Teste avec une image JPG/PNG de petite taille |
| Perte de données en fermant l'onglet | Les données sont sauvegardées, le problème vient du cache navigateur |
