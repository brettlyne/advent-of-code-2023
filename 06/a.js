// for day 6 of Advent of Code 2023, just modified the input for part B...

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
  let lines = data.split("\n");
  // split by any number of spaces
  const times = lines[0]
    .split(": ")[1]
    .trim()
    .split(/\s+/)
    .map((n) => parseInt(n));
  const distances = lines[1]
    .split(": ")[1]
    .trim()
    .split(/\s+/)
    .map((n) => parseInt(n));

  const waysToWin = Array(times.length).fill(0);
  for (let i = 0; i < times.length; i++) {
    console.log("race", i);
    for (let button = 1; button < times[i]; button++) {
      distance = (times[i] - button) * button;
      if (distance > distances[i]) {
        waysToWin[i]++;
      }
    }
  }

  console.log("waysToWin: ", waysToWin);
  const multipliedWaysToWin = waysToWin.reduce((acc, ways) => acc * ways, 1);
  console.log("multipliedWaysToWin: ", multipliedWaysToWin);
};
