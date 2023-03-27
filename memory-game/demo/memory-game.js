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


function flipCard(card) {
  // ... you need to write this ...
  card.target.style.backgroundColor = `${card.target.className}`;
  console.log(card);
  return card;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.target.style.backgroundColor = "white";
  return;
  // return card.backgroundColor = ''
}

/** Handle clicking on a card: this could be first-card or second-card. */


function handleCardClick(evt) {
  
  if (!flippedCard && firstCard === undefined) {
    firstCard = flipCard(evt);
    flippedCard = true;
    console.log({firstCard, secondCard});
  } else if (flippedCard === true) {
    secondCard = flipCard(evt);
    flippedCard = false;
    console.log({firstCard, secondCard});
  } 
  
  if (firstCard.target.className === secondCard.target.className) {
    console.log('match');

      firstCard.target.removeEventListener('click', handleCardClick);
      secondCard.target.removeEventListener('click', handleCardClick);

      firstCard = undefined;
      secondCard = undefined;
    
  } else if (firstCard.target.className !== secondCard.target.className){
    console.log('no match');

    setTimeout(() => {
      
      unFlipCard(firstCard);
      unFlipCard(secondCard);
      firstCard = undefined;
      secondCard = undefined;
    }, 1000);

  };
};

