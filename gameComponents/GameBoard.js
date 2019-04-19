const assert = require('assert');
const Player = require('./Player');

class GameBoard {
  constructor(gameId) {
    this.id = gameId;
    this.players = {};
    this.roomName = "New Room";
    this.playersCount = 0
  };

  setRoomName(name) {
    this.roomName = name;
  }

  addPlayer(player) {
    if (!this.players[player.id]) {
      this.players[[player.id]] = player
      this.playersCount++;
    } else {
      throw "player already exists";
    }
  };

  getPlayerNames() {
    const ids = Object.keys(this.players);
    return ids.map(id => { return this.players.id.name })
  };

  getPlayerIds() {
    return Object.keys(this.players);
  }

  removePlayer(id) {
    const removedPlayer = this.players.id
    delete this.players[id];
    this.playersCount--;
    return removedPlayer;
  }

  revealDice() {
    const ids = this.getPlayerIds();
    return ids.map(id => { return this.players[id].diceSet });
  }

}

module.exports = GameBoard;
