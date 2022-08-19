'use strict';

// Selecting elements
const active0El = document.querySelector('.player--0');
const active1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currentPlayer0El = document.getElementById('current--0');
const currentPlayer1El = document.getElementById('current--1');

// Starting conditions

let currentPlayer, currentScore, scores, playing;

// Functions

const init = function () {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentPlayer0El.textContent = 0;
  currentPlayer1El.textContent = 0;

  diceEl.classList.add('hidden');
  active0El.classList.remove('player--winner');
  active1El.classList.remove('player--winner');
  active0El.classList.add('player--active');
  active1El.classList.remove('player--active');
};

init();

console.log(currentPlayer, currentScore, scores, playing);

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  active0El.classList.toggle('player--active');
  active1El.classList.toggle('player--active');
};

// Project starts

// Generate random dice roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //   Is the dice rolled 1?
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;

      // Display new score
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // Is total score >= 100
    if (scores[currentPlayer] >= 30) {
      // Current player wins
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      playing = false;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
