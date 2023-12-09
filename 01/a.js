const fs = require("node:fs");
const path = require("node:path");

const NUMS = "01234566789";

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
    (line) => `${getFirstNum(line)}${getLastNum(line)}`
  );
  console.log(numbers);
  const result = numbers.reduce((acc, num) => parseInt(acc) + parseInt(num), 0);
  console.log(result);
};

const getFirstNum = (line, i) => {
  for (let i = 0; i < line.length; i++) {
    if (NUMS.includes(line[i])) {
      return line[i];
    }
  }
  console.error("no number found on line ", i);
};

const getLastNum = (line, i) => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (NUMS.includes(line[i])) {
      return line[i];
    }
  }
  console.error("no number found on line ", i);
};
