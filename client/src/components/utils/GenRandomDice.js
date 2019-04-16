const GenRandomDice = numberOfDice => {
  const maxFaceValue = 6;
  var randomDice = [];
  for (var i = 0; i < numberOfDice; i++) {
    const dice = Math.floor(Math.random() * maxFaceValue + 1);
    randomDice.push(dice)
    // console.log(dice);
  }
  // console.log(randomDice);
  return randomDice;
}

export default GenRandomDice;