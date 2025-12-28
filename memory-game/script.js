const gameBoard = document.getElementById('gameBoard');
const scoreEl = document.getElementById('score');
const movesEl = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');
const messageEl = document.getElementById('message');

const symbols = ['💕', '💜', '🌟', '⭐', '🎄', '🎁', '💫', '✨'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let score = 0;
let lockBoard = false;

function initGame() {
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  score = 0;
  lockBoard = false;
  messageEl.textContent = '';
  gameBoard.innerHTML = '';
  
  // Créer les paires de cartes
  const cardPairs = [...symbols, ...symbols];
  cardPairs.sort(() => Math.random() - 0.5);
  
  cardPairs.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">${symbol}</div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push({ element: card, symbol: symbol, index: index });
  });
  
  updateDisplay();
}

function flipCard(e) {
  if (lockBoard) return;
  
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  
  card.classList.add('flipped');
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    lockBoard = true;
    moves++;
    updateDisplay();
    
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.back').textContent;
    const symbol2 = card2.querySelector('.back').textContent;
    
    if (symbol1 === symbol2) {
      setTimeout(() => {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        score += 10;
        updateDisplay();
        flippedCards = [];
        lockBoard = false;
        
        if (matchedPairs === symbols.length) {
          messageEl.textContent = '🎉 Félicitations ! Tu as gagné ! 🎉';
        }
      }, 500);
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function updateDisplay() {
  scoreEl.textContent = score;
  movesEl.textContent = moves;
}

resetBtn.addEventListener('click', initGame);

initGame();

