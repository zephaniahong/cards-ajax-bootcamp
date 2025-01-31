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
const getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// cards is an array of card objects
const shuffleCards = function (cards) {
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
};

const makeDeck = function () {
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
};

/*
 * ========================================================
 * ========================================================
 * ========================================================
 * ========================================================
 *
 *                  Controller Functions
 *
 * ========================================================
 * ========================================================
 * ========================================================
 */

export default function initGamesController(db) {
  // render the main page
  const index = (request, response) => {
    response.render('games/index');
  };

  // create a new game. Insert a new row in the DB.
  const create = async (request, response) => {
    // deal out a new shuffled deck for this game.
    const cardDeck = shuffleCards(makeDeck());
    const playerHand = [cardDeck.pop(), cardDeck.pop()];

    const newGame = {
      gameState: {
        previousHand: '',
        turn: 1,
        cardDeck,
        playerHand,
      },
    };

    try {
      // run the DB INSERT query
      const game = await db.Game.create(newGame);

      // send the new game back to the user.
      // dont include the deck so the user can't cheat
      response.send({
        turn: game.gameState.turn,
        id: game.id,
        playerHand: game.gameState.playerHand,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  // deal two new cards from the deck.
  const deal = async (request, response) => {
    let current;
    try {
      // get the game by the ID passed in the request
      const game = await db.Game.findByPk(request.params.id);

      // make changes to the object
      const { turn } = game.gameState;
      const previousHand = game.gameState.playerHand;
      const playerHand = [game.gameState.cardDeck.pop(), game.gameState.cardDeck.pop()];

      await game.update({
        gameState: {
          previousHand,
          turn: turn + 1,
          cardDeck: game.gameState.cardDeck,
          playerHand,
        },
      });
      // check for winning condition if its the second hand dealt
      if (game.gameState.turn % 2 === 0) {
        // get highest rank of previous hand
        let highestPreviousRank = 0;
        for (let i = 0; i < previousHand.length; i += 1) {
          if (previousHand[i].rank > highestPreviousRank) {
            highestPreviousRank = previousHand[i].rank;
          }
        }
        // get highest rank of current hand
        let highestCurrentRank = 0;
        for (let i = 0; i < playerHand.length; i += 1) {
          if (playerHand[i].rank > highestCurrentRank) {
            highestCurrentRank = playerHand[i].rank;
          }
        }
        if (highestCurrentRank > highestPreviousRank) {
          current = true;
        } else if (highestCurrentRank === highestPreviousRank) {
          current = 'draw';
        }
        else {
          current = false;
        }
      } else {
        current = '';
      }
      // send the updated game back to the user.
      // dont include the deck so the user can't cheat
      response.send({
        current,
        turn,
        id: game.id,
        playerHand: game.gameState.playerHand,
      });
    } catch (error) {
      response.status(500).send(error);
    }
  };

  // return all functions we define in an object
  // refer to the routes file above to see this used
  return {
    deal,
    create,
    index,
  };
}
