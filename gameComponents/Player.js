class Player {
  constructor(playerId, numOfDice = 5) {
    this.id = playerId
    this.diceSet = Array.apply(null, Array(numOfDice));
    this.name = undefined;
  }

  setName(name) {
    this.name = name;
  }

  rollDice() {
    // this.diceSet.forEach(function (e) { console.log(1) });
    this.diceSet = this.diceSet.map(die => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      return newValue;
    })
  }

}

module.exports = Player;