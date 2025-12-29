const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Personalization = require('../models/Personalization');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-becky');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Créer ou mettre à jour une personnalisation
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { recipientName, customMessages, customPhotos } = req.body;
    
    if (!recipientName) {
      return res.status(400).json({ error: 'Le nom du destinataire est obligatoire' });
    }
    
    // Chercher ou créer une personnalisation
    let personalization = await Personalization.findOne({ user: req.userId });
    
    if (personalization) {
      // Mettre à jour
      personalization.recipientName = recipientName;
      personalization.customMessages = customMessages || [];
      personalization.customPhotos = customPhotos || [];
      personalization.updatedAt = new Date();
    } else {
      // Créer
      personalization = new Personalization({
        user: req.userId,
        recipientName,
        customMessages: customMessages || [],
        customPhotos: customPhotos || []
      });
    }
    
    await personalization.save();
    
    res.json({
      success: true,
      message: 'Personnalisation sauvegardée',
      personalization
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer la personnalisation
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const personalization = await Personalization.findOne({ user: req.userId });
    
    if (!personalization) {
      return res.status(404).json({ error: 'Aucune personnalisation trouvée' });
    }
    
    res.json(personalization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une personnalisation
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    await Personalization.deleteOne({ user: req.userId });
    res.json({ success: true, message: 'Personnalisation supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
