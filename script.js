const cardValues = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; // Pares de cartas
let shuffledValues = shuffleArray(cardValues);
let firstCard = null;
let secondCard = null;
let flippedCards = 0;

const gameBoard = document.getElementById('game-board');
const victoryMessage = document.getElementById('victory-message');
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartGame);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameBoard.innerHTML = '';
  shuffledValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.setAttribute('data-index', index);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flipped') || firstCard && secondCard) return;

  this.classList.add('flipped');
  this.textContent = this.getAttribute('data-value');

  if (!firstCard) {
    firstCard = this;
  } else if (!secondCard) {
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  const firstValue = firstCard.getAttribute('data-value');
  const secondValue = secondCard.getAttribute('data-value');

  if (firstValue === secondValue) {
    flippedCards += 2;
    resetCards();

    if (flippedCards === cardValues.length) {
      showVictoryMessage();
    }
  } else {
    setTimeout(unflipCards, 1000);
  }
}

function unflipCards() {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  firstCard.textContent = '';
  secondCard.textContent = '';
  resetCards();
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function showVictoryMessage() {
  victoryMessage.classList.remove('hidden');
}

function restartGame() {
  flippedCards = 0;
  shuffledValues = shuffleArray(cardValues);
  createBoard();
  victoryMessage.classList.add('hidden');
}

// Inicializa o tabuleiro ao carregar a página
createBoard();
