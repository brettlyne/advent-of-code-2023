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
  findPossibleGames(gameData);
};

const findPossibleGames = (gameData) => {
  const AVAILABLE_CUBES = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const COLORS = Object.keys(AVAILABLE_CUBES);

  gameData.forEach((game) => {
    let possible = true;
    game.rounds.forEach((round) => {
      COLORS.forEach((color) => {
        if (round[color] && AVAILABLE_CUBES[color] < round[color]) {
          possible = false;
        }
      });
    });
    game.possible = possible;
  });
  // console.log(util.inspect(gameData, { depth: Infinity }));
  sumPossibleGameIds(gameData);
};

const sumPossibleGameIds = (gameData) => {
  const possibleGames = gameData.filter((game) => game.possible);
  const sum = possibleGames.reduce((acc, game) => {
    return acc + parseInt(game.gameId);
  }, 0);
  console.log("sum:", sum);
};
