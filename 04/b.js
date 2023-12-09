const { log } = require("node:console");
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
    card.score = card.cardNums.filter((n) =>
      card.winningNums.includes(n)
    ).length;
  }
  console.log(cardData);
  // const scoreSum = cardData.reduce((acc, card) => acc + card.score, 0);
  // console.log("scoreSum: ", scoreSum);

  // initialize card counts to 1 each
  const cardCounts = cardData.map(() => 1);

  // loop through each card, adding to cardCounts
  cardData.forEach((card, i) => {
    for (let j = 1; j <= card.score; j++) {
      console.log("i: ", i, "j: ", j, "cardCounts: ", cardCounts);
      cardCounts[j + i] += cardCounts[i];
    }
  });

  console.log("cardCounts: ", cardCounts);

  const total = cardCounts.reduce((acc, count) => acc + count, 0);
  console.log("total: ", total);
};
