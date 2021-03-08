/*
 * ========================================================
 * ========================================================
 * ========================================================
 * ========================================================
 *
 *                  Card Deck Functions
 *
 * ========================================================
 * ========================================================
 * ========================================================
 */

// get a random index from an array given it's size
export function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

// cards is an array of card objects
export function shuffleCards(cards) {
  let currentIndex = 0;

  // loop over the entire cards array
  while (currentIndex < cards.length) {
    // select a random position from the deck
    const randomIndex = getRandomIndex(cards.length);

    // get the current card in the loop
    const currentItem = cards[currentIndex];

    // get the random card
    const randomItem = cards[randomIndex];

    // swap the current card and the random card
    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;

    currentIndex += 1;
  }

  // give back the shuffled deck
  return cards;
}

export function makeDeck() {
  // create the empty deck at the beginning
  const deck = [];

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  let suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    let rankCounter = 1;
    while (rankCounter <= 13) {
      let cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName === 1) {
        cardName = 'ace';
      } else if (cardName === 11) {
        cardName = 'jack';
      } else if (cardName === 12) {
        cardName = 'queen';
      } else if (cardName === 13) {
        cardName = 'king';
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }

  return deck;
}

export function createGame(){

  // deal out a new shuffled deck for this game.
  const cardDeck = shuffleCards(makeDeck());
  const playerHand = [cardDeck.pop(), cardDeck.pop()];

  return {
    gameState: {
      cardDeck,
      playerHand,
      score:0
    },
  };
}

export function dealCards(cardDeck){
  return [cardDeck.pop(), cardDeck.pop()];
}

export function isLargest(chosenCard, hand){

  for( let i=0; i<hand.length; i+=1){
    if( chosenCard.rank < hand[i].rank ){
      return false;
    }
  }

  return true;
}

export function setUpdatedGame(chosenCard, game){

  let playerHand;
  let winner = null;
  if( game.cardDeck.length > 1 ){

    playerHand = dealCards(game.cardDeck);

    if( chosenCard ){
      if( chosenCard != 'first' ){

        winner = isLargest( chosenCard, playerHand);

        if( winner ){
          game.score = game.score+1;
        }else{
          game.score = game.score-1;
        }
      }
    }
  }

  return {
    cardDeck: game.cardDeck,
    previousHand: game.playerHand,
    score:game.score,
    playerHand,
    winner,
  };
}
