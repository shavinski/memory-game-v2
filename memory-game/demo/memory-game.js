"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  
  for (let color of colors) {
    const card = document.createElement('div');
    // missing code here ...
    card.classList.add(`${color}`);
    gameBoard.append(card);

    (card.addEventListener('click', handleCardClick));
  };
};


/** Flip a card face-up. */
let flippedCard = false;
let firstCard;
let secondCard;
let inProcessOfGuess = false;


function flipCard(card) {
  // ... you need to write this ...
  card.target.style.backgroundColor = `${card.target.className}`;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.target.style.backgroundColor = "white";
}

/** Handle clicking on a card: this could be first-card or second-card. */


function handleCardClick(evt) {

  if(inProcessOfGuess) {
    return;
  };

  flipCard(evt);
  
  if (!flippedCard) {
    firstCard = evt;
    flippedCard = true;
  } else {
    secondCard = evt;
    // doesn't allow the same square to be clicked an counted as two
    if (secondCard.target === firstCard.target) {
      secondCard = undefined;
      return;
    }
    flippedCard = false;
    inProcessOfGuess = true;
  };

// added this if statement in order to avoid error in console of accessing second.target.className to early
// would get error of second.target.className is undefined everytime i click first square 
if (secondCard !== undefined) {
  if (firstCard.target.className === secondCard.target.className) {
    setTimeout(() => {
      firstCard.target.removeEventListener('click', handleCardClick);
      secondCard.target.removeEventListener('click', handleCardClick);
      firstCard = undefined;
      secondCard = undefined;
      inProcessOfGuess = false;
    }, FOUND_MATCH_WAIT_MSECS);
  } else {
    setTimeout(() => {
      unFlipCard(firstCard);
      unFlipCard(secondCard);
      firstCard = undefined;
      secondCard = undefined;
      inProcessOfGuess = false;
    }, 1000);
  };
 };
};

