const GameBoard = require("../gameComponents/GameBoard");
const Player = require("../gameComponents/Player");
const assert = require("assert");

// Object creation
const newGame = new GameBoard(321)
console.log("Game id:", newGame.id);
assert.ok(newGame.id, "Game creation test passed");

// Add player
const player1 = new Player(123);
newGame.addPlayer(player1);
const playersCountAfterAdd = Object.keys(newGame.players).length;
console.log("Number of players in game after addition:", playersCountAfterAdd);
assert.equal(newGame.playersCount, playersCountAfterAdd, "Players count need to match number of players in players object");
assert.equal(playersCountAfterAdd, 1, "Need to be able to add a player");


// More than one player
const player2 = new Player(331);
newGame.addPlayer(player2);
const playersCounterAfterAddingSecondPlayer = Object.keys(newGame.players).length;
console.log("Number of players in game after another addition:", playersCounterAfterAddingSecondPlayer);
assert.equal(newGame.playersCount, playersCounterAfterAddingSecondPlayer, "Players count need to match number of players in players object");
assert.equal(playersCounterAfterAddingSecondPlayer, 2, "Need to be able to add a player");

// Roll dice
player1.rollDice();
console.log("Player1 dice set:", player1.diceSet);
assert.ok(player1.diceSet[0], "Player need to be able to roll dice")
player2.rollDice()
console.log("Player2 dice set:", player2.diceSet)
assert.ok(player2.diceSet[0], "Player need to be able to roll dice")

// Reveal dice
const gameDiceSet = newGame.revealDice()
console.log("Reveal dice:", gameDiceSet);
assert.equal(gameDiceSet.length, 2, "Need to be able to reveal dice");
assert.equal(gameDiceSet[0].length, 5, "Need to be able to reveal dice");


// Remove player
newGame.removePlayer(player1.id);
const playersCountAfterDelete = Object.keys(newGame.players).length;
console.log("Number of players in game after one player deletion:", playersCountAfterDelete);
assert.equal(newGame.playersCount, playersCountAfterDelete, "Players count need to match number of players in players object");
assert.equal(playersCountAfterDelete, 1, "Need to be able to delete a player");