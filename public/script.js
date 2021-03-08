const createCardEl = (card) => {

  let suitEmoji;
  switch( card.suit ){
    case 'hearts':
      suitEmoji = '♥︎';
      break;
    case 'clubs':
      suitEmoji = '♣︎';
      break;
    case 'diamonds':
      suitEmoji = '♦︎';
      break;
    case 'spades':
      suitEmoji = '♠︎';
      break;
  }

  const div = document.createElement('div');

  div.classList.add('card');

  div.innerHTML = `<span class="suit">${suitEmoji}</span>
      <span class="name">${card.name}</span>`;

  return div;
};

// global value that holds info about the current hand.
let currentGame = null;
let chosenCard = 'first';
let currentPlayerHand = [];

// create game btn
const createGameBtn = document.createElement('button');

// DOM manipulation function that displays the player's current hand.
const runGame = function ({ playerHand, score, winner }) {

  currentPlayerHand = playerHand
  // manipulate DOM
  const gameContainer = document.querySelector('#game-container');

  const handEl = document.createElement('div');

  handEl.classList.add('hand');

  playerHand.forEach( card => {
    const cardEl = createCardEl(card);
    handEl.appendChild( cardEl );
    cardEl.addEventListener('click', ()=>{

      document.querySelectorAll('.card').forEach( card => {
        card.classList.remove('selected');
      });

      if( currentPlayerHand.includes( card ) ){
        chosenCard = card;
        cardEl.classList.add('selected');;
      }
    });
  });

  gameContainer.prepend( handEl );

  let roundMessage = '';
  if( winner === false ){
    roundMessage = 'You lost.';
  }else if( winner === true ){
    roundMessage = 'You won.';
  }

  document.querySelector('#score').innerText = `Score is: ${score}. ${roundMessage}`;
};

// make a request to the server
// to change the deck. set 2 new cards into the player hand.
const dealCards = function () {
  axios.put(`/games/${currentGame.id}/deal`,{chosenCard})
    .then((response) => {

      chosenCard = null;
      // get the updated hand value
      currentGame = response.data;

      // display it to the user
      runGame(currentGame);
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
      // for this current game, create a button that will allow the user to
      // manipulate the deck that is on the DB.
      // Create a button for it.
      const dealBtn = document.createElement('button');
      dealBtn.addEventListener('click', dealCards);

      // display the button
      dealBtn.innerText = 'Deal';
      document.body.prepend(dealBtn);

      // set the global value to the new game.
      currentGame = response.data;

      console.log(currentGame);

      // display it out to the user
      runGame(currentGame);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
};

// manipulate DOM, set up create game button
createGameBtn.addEventListener('click', createGame);
createGameBtn.innerText = 'Create Game';
document.body.prepend(createGameBtn);
