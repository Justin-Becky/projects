const sky = document.getElementById('sky');
const wishInput = document.getElementById('wishInput');
const makeWishBtn = document.getElementById('makeWishBtn');
const wishesContainer = document.getElementById('wishes');

// Créer des étoiles aléatoires
function createStars() {
  const starCount = 30;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '⭐';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    
    star.addEventListener('click', () => {
      star.classList.add('clicked');
      setTimeout(() => {
        star.remove();
        createStar();
      }, 1000);
    });
    
    sky.appendChild(star);
  }
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';
  star.textContent = '⭐';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 2 + 's';
  
  star.addEventListener('click', () => {
    star.classList.add('clicked');
    setTimeout(() => {
      star.remove();
      createStar();
    }, 1000);
  });
  
  sky.appendChild(star);
}

function loadWishes() {
  const saved = localStorage.getItem('wishes');
  if (saved) {
    const wishes = JSON.parse(saved);
    wishes.forEach(wish => {
      addWishToDisplay(wish.text, wish.date);
    });
  }
}

function addWishToDisplay(text, date) {
  const wishItem = document.createElement('div');
  wishItem.className = 'wish-item';
  wishItem.innerHTML = `
    <div class="date">${date}</div>
    <div class="text">${text}</div>
  `;
  wishesContainer.appendChild(wishItem);
}

function saveWish(text) {
  const saved = localStorage.getItem('wishes');
  const wishes = saved ? JSON.parse(saved) : [];
  const newWish = {
    text: text,
    date: new Date().toLocaleDateString('fr-FR')
  };
  wishes.push(newWish);
  localStorage.setItem('wishes', JSON.stringify(wishes));
  addWishToDisplay(text, newWish.date);
}

makeWishBtn.addEventListener('click', () => {
  const wishText = wishInput.value.trim();
  if (wishText) {
    saveWish(wishText);
    wishInput.value = '';
    
    // Animation d'étoile qui monte
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.position = 'fixed';
    star.style.fontSize = '3rem';
    star.style.left = '50%';
    star.style.bottom = '20%';
    star.style.transform = 'translateX(-50%)';
    star.style.zIndex = '1000';
    star.style.pointerEvents = 'none';
    star.style.animation = 'wishFly 2s ease-out forwards';
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 2000);
  }
});

// Animation CSS pour l'étoile qui monte
const style = document.createElement('style');
style.textContent = `
  @keyframes wishFly {
    0% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(-500px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

createStars();
loadWishes();

