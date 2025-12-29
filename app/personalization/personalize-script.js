// Initialiser la page
document.addEventListener('DOMContentLoaded', function() {
  loadPersonalization();
  setupEventListeners();
});

function setupEventListeners() {
  // Bouton ajouter message
  document.getElementById('add-message-btn').addEventListener('click', addMessageField);
  
  // Bouton ajouter photo
  document.getElementById('add-photo-btn').addEventListener('click', addPhotoField);
  
  // Bouton sauvegarder
  document.getElementById('save-personalization-btn').addEventListener('click', savePersonalization);
  
  // Bouton passer
  document.getElementById('skip-personalization-btn').addEventListener('click', function() {
    window.location.href = 'index.html';
  });
}

// Charger la personnalisation existante
function loadPersonalization() {
  const personalization = JSON.parse(localStorage.getItem('personalization')) || {};
  
  if (personalization.senderName) {
    document.getElementById('sender-name').value = personalization.senderName;
  }
  if (personalization.recipientName) {
    document.getElementById('recipient-name').value = personalization.recipientName;
  }
  if (personalization.meetingDate) {
    document.getElementById('meeting-date').value = personalization.meetingDate;
  }
  if (personalization.nextEventName) {
    document.getElementById('next-event-name').value = personalization.nextEventName;
  }
  if (personalization.nextEventDate) {
    document.getElementById('next-event-date').value = personalization.nextEventDate;
  }
  
  if (personalization.customMessages && personalization.customMessages.length > 0) {
    personalization.customMessages.forEach(msg => {
      addMessageField(msg.day, msg.message);
    });
  }
  
  if (personalization.customPhotos && personalization.customPhotos.length > 0) {
    personalization.customPhotos.forEach(photo => {
      addPhotoField(photo);
    });
  }
}

// Ajouter un champ de message
function addMessageField(day = '', message = '') {
  const container = document.getElementById('custom-messages');
  const messageItem = document.createElement('div');
  messageItem.className = 'message-item';
  
  let dayOptions = '';
  for (let i = 1; i <= 25; i++) {
    dayOptions += `<option value="${i}" ${day === i ? 'selected' : ''}>Jour ${i}</option>`;
  }
  
  messageItem.innerHTML = `
    <select class="message-day">
      <option value="">Sélectionner un jour</option>
      ${dayOptions}
    </select>
    <textarea class="message-text" placeholder="Ton message...">${message}</textarea>
    <button type="button" class="delete-message">✕</button>
  `;
  
  messageItem.querySelector('.delete-message').addEventListener('click', function() {
    messageItem.remove();
  });
  
  container.appendChild(messageItem);
}

// Ajouter un champ de photo
function addPhotoField(imageData = '') {
  const container = document.getElementById('custom-photos');
  const photoItem = document.createElement('div');
  photoItem.className = 'photo-item';
  
  const img = document.createElement('img');
  img.src = imageData || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50" y="50" font-size="12" fill="%23999" text-anchor="middle" dy=".3em"%3E+Photo%3C/text%3E%3C/svg%3E';
  
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  
  const label = document.createElement('label');
  label.appendChild(fileInput);
  
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-photo';
  deleteBtn.textContent = '✕';
  
  photoItem.appendChild(img);
  photoItem.appendChild(label);
  photoItem.appendChild(deleteBtn);
  
  // Gestion du changement de photo
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        img.src = event.target.result;
        photoItem.dataset.imageData = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Suppression de la photo
  deleteBtn.addEventListener('click', function() {
    photoItem.remove();
  });
  
  if (imageData) {
    img.src = imageData;
    photoItem.dataset.imageData = imageData;
  }
  
  container.appendChild(photoItem);
}

// Sauvegarder la personnalisation
function savePersonalization() {
  const senderName = document.getElementById('sender-name').value.trim();
  const recipientName = document.getElementById('recipient-name').value.trim();
  const meetingDate = document.getElementById('meeting-date').value;
  const nextEventName = document.getElementById('next-event-name').value.trim();
  const nextEventDate = document.getElementById('next-event-date').value;
  
  if (!recipientName) {
    alert('Veuillez entrer le nom du destinataire');
    return;
  }
  
  // Collecteur les messages
  const customMessages = [];
  document.querySelectorAll('.message-item').forEach(item => {
    const day = item.querySelector('.message-day').value;
    const message = item.querySelector('.message-text').value.trim();
    
    if (day && message) {
      customMessages.push({
        day: parseInt(day),
        message: message
      });
    }
  });
  
  // Collecter les photos
  const customPhotos = [];
  document.querySelectorAll('.photo-item').forEach(item => {
    const imageData = item.dataset.imageData;
    if (imageData) {
      customPhotos.push(imageData);
    }
  });
  
  // Sauvegarder
  const personalization = {
    senderName: senderName || '??',
    recipientName: recipientName,
    meetingDate: meetingDate || null,
    nextEventName: nextEventName || null,
    nextEventDate: nextEventDate || null,
    customMessages: customMessages,
    customPhotos: customPhotos,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem('personalization', JSON.stringify(personalization));
  
  alert(`Calendrier personnalisé pour ${recipientName} ! 🎉`);
  window.location.href = '../../index.html';
}
