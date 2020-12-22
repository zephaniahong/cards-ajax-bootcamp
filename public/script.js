// global value that holds info about the current hand.
var currentGame = null;

// create game btn
var createGameBtn = document.createElement('button');

// DOM manipulation function that displays the player's current hand.
var runGame = function( {cards} ){

  // manipulate DOM
  const gameContainer = document.querySelector('#game-container');

  gameContainer.innerText = `
    Your Hand:
    ====
    ${cards.playerHand[0].name}
    of
    ${cards.playerHand[0].suit}
    ====
    ${cards.playerHand[1].name}
    of
    ${cards.playerHand[1].suit}
  `;
};

// make a request to the server
// to change the deck. set 2 new cards into the player hand.
var dealCards = function(){

   axios.put(`/games/${currentGame.id}/deal`)
      .then(function (response) {

        // get the updated hand value
        currentGame = response.data;

        // display it to the user
        runGame( currentGame );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
};

var createGamne =  function(){

  // Make a request to create a new game
  axios.post('/games')
    .then(function (response) {

      // set the global value to the new game.
      currentGame = response.data;

      console.log( currentGame );

      // display it out to the user
      runGame( currentGame );

      // for this current game, create a button that will allow the user to
      // manipulate the deck that is on the DB.
      // Create a button for it.
      var dealBtn = document.createElement('button');
      dealBtn.addEventListener('click', dealCards);

      // display the button
      dealBtn.innerText = "Deal";
      document.body.appendChild( dealBtn );
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

// manipulate DOM, set up create game button
createGameBtn.addEventListener('click',createGame);
createGameBtn.innerText = "Create Game";
document.body.appendChild( createGameBtn );
