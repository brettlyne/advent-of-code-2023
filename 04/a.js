const fs = require("node:fs");
const path = require("node:path");

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data);
});

const parseData = (data) => {
  const lines = data.split("\n");
  // parse out winning numbers and card numbers
  const cardData = lines.map((line) => {
    line = line.split(/:\s+/)[1];
    const [winningNums, cardNums] = line.split(" | ");
    return {
      winningNums: winningNums.split(/\s+/).map((n) => parseInt(n)),
      cardNums: cardNums.split(/\s+/).map((n) => parseInt(n)),
    };
  });
  // count how many numbers are in the winning numbers
  for (const card of cardData) {
    card.numbersInWinning = card.cardNums.filter((n) =>
      card.winningNums.includes(n)
    ).length;
    card.score =
      card.numbersInWinning === 0 ? 0 : Math.pow(2, card.numbersInWinning - 1);
  }
  console.log(cardData);
  const scoreSum = cardData.reduce((acc, card) => acc + card.score, 0);
  console.log("scoreSum: ", scoreSum);
};
