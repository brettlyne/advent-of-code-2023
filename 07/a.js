const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");

const CARD_RANKS = "23456789TJQKA";

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data);
});

const parseData = (data) => {
  let lines = data.split("\n");
  // console.log("lines: ", lines);
  const hands = lines.map((line) => {
    const split = line.split(" ");
    const hand = split[0];
    let strength = 1;
    for (let i = 0; i < 5; i++) {
      var regexp = new RegExp(hand[i], "g");
      strength = Math.max(strength, (hand.match(regexp) || []).length);
    }
    // add .5 if full house
    if (strength === 3 && new Set(hand).size === 2) {
      strength = 3.5;
    }
    let cardStrength = 0;
    for (let i = 0; i < 5; i++) {
      cardStrength += Math.pow(100, 4 - i) * CARD_RANKS.indexOf(hand[i]);
    }

    return { hand, strength, cardStrength, bid: parseInt(split[1]) };
  });
  console.log("hands: ", hands);

  hands.sort((a, b) => {
    if (a.strength != b.strength) {
      return a.strength - b.strength;
    }
    return a.cardStrength - b.cardStrength;
  });
  console.log(util.inspect(hands, { depth: Infinity }));

  let totalWinnings = 0;
  for (let i = 0; i < hands.length; i++) {
    totalWinnings += hands[i].bid * (i + 1);
  }
  console.log("totalWinnings: ", totalWinnings);
};
