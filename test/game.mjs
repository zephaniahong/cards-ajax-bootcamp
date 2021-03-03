import { expect } from 'chai';

import { createGame, dealCards } from '../game/index.mjs';

describe('Basic Game Functionalities', function () {
  it('Deals two cards', function () {
    const game = createGame();
    const playerHand = game.gameState.playerHand;

    // hard to check if something is random, but
    // can check if the cards are not equal to themselves
    expect(playerHand[0]).to.deep.not.equal(playerHand[1]);

    // check if the cards got taken out of the deck
    expect(game.gameState.cardDeck.length).to.equal(50);
  });
});
