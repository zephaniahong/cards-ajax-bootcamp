// global value that holds info about the current hand.
let currentGame = null;

// create game btn
const createGameBtn = document.createElement('button');
const banner = document.createElement('span');

// DOM manipulation function that displays the player's current hand.
const runGame = function ({ playerHand }) {
  // manipulate DOM
  const gameContainer = document.querySelector('#game-container');

  gameContainer.innerText = `
    Your Hand:
    ====
    ${playerHand[0].name}
    of
    ${playerHand[0].suit}
    ====
    ${playerHand[1].name}
    of
    ${playerHand[1].suit}
  `;
};

// make a request to the server
// to change the deck. set 2 new cards into the player hand.
const dealCards = function () {
  axios.put(`/games/${currentGame.id}/deal`)
    .then((response) => {
      // get the updated hand value
      currentGame = response.data;
      // display it to the user
      if (currentGame.current === true) {
        runGame(currentGame);
        banner.innerText = 'you Win';
      } else if (currentGame.current === false) {
        runGame(currentGame);
        banner.innerText = 'you Lose';
      } else if (currentGame.current === 'draw') {
        runGame(currentGame);
        banner.innerText = 'draw';
      }
      else {
        runGame(currentGame);
        banner.innerText = '';
      }
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

const createGame = function () {
  // Make a request to create a new game
  axios.post('/games')
    .then((response) => {
      // set the global value to the new game.
      currentGame = response.data;
      console.log(currentGame);

      // display it out to the user
      runGame(currentGame);

      // for this current game, create a button that will allow the user to
      // manipulate the deck that is on the DB.
      // Create a button for it.
      const dealBtn = document.createElement('button');

      dealBtn.addEventListener('click', dealCards);

      // display the button
      dealBtn.innerText = 'Deal';
      document.body.appendChild(dealBtn);
      document.body.appendChild(banner);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

// manipulate DOM, set up create game button
createGameBtn.addEventListener('click', createGame);
createGameBtn.innerText = 'Create Game';
document.body.appendChild(createGameBtn);
