const fs = require("node:fs");
const path = require("node:path");

const NUMS = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data);
});

const parseData = (data) => {
  const lines = data.split("\n");
  const numbers = lines.map(
    (line) => 10 * getFirstNum(line) + getLastNum(line)
  );
  console.log(numbers);
  const result = numbers.reduce((acc, num) => acc + num, 0);
  console.log(result);
};

const getFirstNum = (line, i) => {
  for (let i = 0; i < line.length; i++) {
    for (const [key, value] of Object.entries(NUMS)) {
      if (key === line.substr(i, key.length)) {
        return value;
      }
    }
  }
  console.error("no number found on line ", i);
};

const getLastNum = (line, i) => {
  for (let i = line.length - 1; i >= 0; i--) {
    for (const [key, value] of Object.entries(NUMS)) {
      if (key === line.substr(i, key.length)) {
        return value;
      }
    }
  }
  console.error("no number found on line ", i);
};
