const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

// Inscription
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    
    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
    }
    
    // Vérifier si l'utilisateur existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }
    
    // Créer l'utilisateur
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    
    // Générer le token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret-key-becky', {
      expiresIn: '30d'
    });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe obligatoires' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret-key-becky', {
      expiresIn: '30d'
    });
    
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vérifier le token
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
