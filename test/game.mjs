import { expect } from 'chai';

import { createGame, dealCards, setUpdatedGame } from '../game/index.mjs';

describe('Basic Game Functionalities', function () {
  it('Deals two cards', function () {
    const game = createGame();
    const playerHand = game.playerHand;

    // hard to check if something is random, but
    // can check if the cards are not equal to themselves
    expect(playerHand[0]).to.deep.not.equal(playerHand[1]);

    // check if the cards got taken out of the deck
    expect(game.cardDeck.length).to.equal(50);
  });

  it('Updates the deck', function () {
    const game = createGame();
    const playerHand = game.playerHand;
    const updatedGame = setUpdatedGame(playerHand[0],game);

    const updatedPlayerHand = updatedGame.playerHand;
    const updatedDeck = updatedGame.cardDeck;

    expect(updatedDeck.length).to.equal(48);
  });

  it("Knows that it's the begining of the game", function () {
    const game = createGame();
    const playerHand = game.playerHand;
    const firstCardValue = 'first';
    const updatedGame = setUpdatedGame(firstCardValue,game);
    expect(updatedGame.winner).to.equal(null);
    expect(updatedGame.score).to.equal(0);
  });

  it("The user can lose a game", function () {
    const game = createGame();
    game.playerHand = [
      {
        rank:2,
        name:2,
        suit:'clubs'
      },
      {
        rank:2,
        name:2,
        suit:'clubs'
      }
    ];

    game.cardDeck = [
      {
        rank:9,
        name:9,
        suit:'clubs'
      },
      {
        rank:9,
        name:9,
        suit:'clubs'
      }
    ]

    const updatedGame = setUpdatedGame(0, game);
    expect(updatedGame.winner).to.equal(false);
    expect(updatedGame.score).to.equal(-1);
  });

  it("The user can win a game", function () {
    const game = createGame();
    game.playerHand = [
      {
        rank:9,
        name:9,
        suit:'clubs'
      },
      {
        rank:9,
        name:9,
        suit:'clubs'
      }
    ];

    game.cardDeck = [
      {
        rank:2,
        name:2,
        suit:'clubs'
      },
      {
        rank:2,
        name:2,
        suit:'clubs'
      }
    ]

    const updatedGame = setUpdatedGame(0, game);
    expect(updatedGame.winner).to.equal(true);
    expect(updatedGame.score).to.equal(1);
  });







});
