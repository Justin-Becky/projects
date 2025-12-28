const questionSection = document.getElementById('questionSection');
const resultSection = document.getElementById('resultSection');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
const resultMessageEl = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

const questions = [
  {
    question: "Tu es mon miracle de Noël le plus doux. 🌟❄️",
    answers: [
      "C'est vrai ! 💕",
      "Je suis d'accord ! ✨",
      "Moi aussi je pense ça ! 💜",
      "Exactement ! 🎄"
    ],
    correct: 0
  },
  {
    question: "Chaque instant avec toi est un cadeau précieux. 🎄",
    answers: [
      "Oui, chaque moment compte ! 💕",
      "Je suis d'accord ! ✨",
      "C'est tellement vrai ! 💜",
      "Exactement ! 🎁"
    ],
    correct: 0
  },
  {
    question: "Tu es mon plus beau cadeau. 🌟",
    answers: [
      "Et toi aussi pour moi ! 💕",
      "Merci ! ✨",
      "Je t'aime ! 💜",
      "C'est réciproque ! 🎄"
    ],
    correct: 0
  },
  {
    question: "Chaque étoile me rappelle un moment partagé avec toi. ⭐",
    answers: [
      "Moi aussi ! 💕",
      "C'est magnifique ! ✨",
      "Je pense pareil ! 💜",
      "Exactement ! 🌟"
    ],
    correct: 0
  },
  {
    question: "Je t'offre mon amour, emballé de mille étoiles. ✨",
    answers: [
      "Et moi le mien ! 💕",
      "Merci ! ✨",
      "Je t'aime ! 💜",
      "C'est réciproque ! 🎁"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  
  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => selectAnswer(index, btn));
    answersEl.appendChild(btn);
  });
  
  nextBtn.classList.add('hidden');
  selectedAnswer = null;
}

function selectAnswer(index, btn) {
  if (selectedAnswer !== null) return;
  
  selectedAnswer = index;
  const q = questions[currentQuestion];
  
  // Toutes les réponses sont "correctes" car c'est un quiz d'amour
  btn.classList.add('correct');
  
  // Désactiver tous les boutons
  document.querySelectorAll('.answer-btn').forEach(b => {
    b.classList.add('disabled');
  });
  
  score++;
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  scoreEl.textContent = `${score}/${questions.length}`;
  
  const percentage = (score / questions.length) * 100;
  if (percentage === 100) {
    resultMessageEl.textContent = "Parfait ! Tu connais parfaitement notre amour ! 💕✨";
  } else if (percentage >= 80) {
    resultMessageEl.textContent = "Excellent ! Tu es très attentif(ve) à notre relation ! 💜";
  } else {
    resultMessageEl.textContent = "Bien joué ! Continue à découvrir notre amour ! 🌟";
  }
}

restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  questionSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
  showQuestion();
});

showQuestion();

