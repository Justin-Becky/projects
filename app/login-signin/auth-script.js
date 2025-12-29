// Charger les formulaires depuis forms.html
fetch('forms.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('forms-container').innerHTML = html;
    initializeFormHandlers();
  });

function initializeFormHandlers() {
  // Gestion de l'alternance entre formulaires
  window.toggleForm = function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
  };

  // Gestion de la soumission du formulaire de login
  document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Valider les données
  if (!email || !password) {
    alert('Veuillez remplir tous les champs');
    return;
  }
  
  // Récupérer les utilisateurs depuis localStorage
  const users = JSON.parse(localStorage.getItem('users')) || {};
  
  if (users[email] && users[email].password === password) {
    // Connexion réussie
    const user = users[email];
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      firstName: user.firstName,
      lastName: user.lastName
    }));
    
    alert('Connexion réussie ! Redirection...');
    window.location.href = 'index.html';
  } else {
    alert('Email ou mot de passe incorrect');
  }
  });

  // Gestion de la soumission du formulaire de sign up
  document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const firstName = document.getElementById('signup-firstName').value;
  const lastName = document.getElementById('signup-lastName').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  
  // Valider les données
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Veuillez remplir tous les champs');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  
  // Récupérer les utilisateurs depuis localStorage
  const users = JSON.parse(localStorage.getItem('users')) || {};
  
  if (users[email]) {
    alert('Un compte avec cet email existe déjà');
    return;
  }
  
  // Créer le nouvel utilisateur
  users[email] = {
    firstName: firstName,
    lastName: lastName,
    password: password
  };
  
  localStorage.setItem('users', JSON.stringify(users));
  
  // Connecter automatiquement
  localStorage.setItem('currentUser', JSON.stringify({
    email: email,
    firstName: firstName,
    lastName: lastName
  }));
  
  alert('Compte créé avec succès ! Redirection...');
  window.location.href = 'index.html';
  });
}
