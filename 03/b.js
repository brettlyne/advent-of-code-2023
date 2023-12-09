const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");
// regex to match any symbol not a number or period
const regexSymbols = /[^\d.]/g;

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  parseData(data);
});

const parseData = (data) => {
  const lines = data.split("\n");
  const regex = /\d+/g; // match all numbers

  const numbers = [];
  const gears = [];
  lines.forEach((line, i) => {
    while ((match = regex.exec(line)) != null) {
      numbers.push({
        line: i,
        value: parseInt(match[0]),
        index: match.index,
      });
    }
    const gearsInLine = [...line.matchAll(/\*/g)].map((r) => ({
      line: i,
      col: r.index,
    }));
    gears.push(...gearsInLine);
  });

  console.log(numbers);
  console.log(gears);

  // add adjacent numbers to gears
  gears.forEach((gear) => {
    gear.numbers = [];
    numbers.forEach((number) => {
      if (number.line >= gear.line - 1 && number.line <= gear.line + 1) {
        if (
          gear.col >= number.index - 1 &&
          gear.col <= number.index + number.value.toString().length
        ) {
          gear.numbers.push(number);
        }
      }
    });
  });

  console.log(util.inspect(gears, { depth: Infinity }));

  const gearsWithTwoNumbers = gears.filter((gear) => gear.numbers.length == 2);
  console.log("sum");
  console.log(
    gearsWithTwoNumbers.reduce(
      (acc, gear) => acc + gear.numbers[0].value * gear.numbers[1].value,
      0
    )
  );
};
