const fs = require("node:fs");
const path = require("node:path");
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
  lines.forEach((line, i) => {
    while ((match = regex.exec(line)) != null) {
      numbers.push({
        line: i,
        value: parseInt(match[0]),
        index: match.index,
      });
    }
  });

  numbers.forEach((num) => {
    num.used = false;
    for (
      let i = Math.max(0, num.line - 1);
      i <= Math.min(lines.length - 1, num.line + 1);
      i++
    ) {
      const section = lines[i].substring(
        Math.max(0, num.index - 1),
        Math.min(lines[i].length, num.index + num.value.toString().length + 1)
      );
      console.log(section);

      regexSymbols.lastIndex = 0;
      if (regexSymbols.test(section)) {
        num.used = true;
      } else {
      }
    }
  });
  console.log(numbers);

  const sum = numbers.reduce((acc, num) => {
    if (num.used) {
      acc += num.value;
    }
    return acc;
  }, 0);
  console.log("sum: ", sum);
};
