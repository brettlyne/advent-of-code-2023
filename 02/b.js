const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data);
});

const parseData = (data) => {
  const lines = data.split("\n");
  console.log(lines);
  const gameData = lines.map((line) => {
    const [game, allRounds] = line.split(": ");
    const gameId = game.split(" ")[1];
    const rounds = allRounds.split("; ").map((round) => {
      const results = round.split(", ");
      const roundResult = {};
      results.forEach((result) => {
        const [count, color] = result.split(" ");
        roundResult[color] = parseInt(count);
      });
      return roundResult;
    });
    return { gameId, rounds };
  });
  findMinimumCubesNeeded(gameData);
};

const findMinimumCubesNeeded = (gameData) => {
  gameData.forEach((game) => {
    const cubesNeeded = {
      red: 0,
      green: 0,
      blue: 0,
    };
    game.rounds.forEach((round) => {
      Object.keys(round).forEach((color) => {
        cubesNeeded[color] = Math.max(cubesNeeded[color], round[color]);
      });
    });
    game.cubesNeeded = cubesNeeded;
    game.power = cubesNeeded.red * cubesNeeded.green * cubesNeeded.blue;
  });
  console.log(util.inspect(gameData, { depth: Infinity }));
  const sumPower = gameData.reduce((acc, game) => {
    return acc + game.power;
  }, 0);
  console.log("sumPower:", sumPower);
};
