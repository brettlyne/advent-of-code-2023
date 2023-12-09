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
  const instructions = lines[0];
  lines = lines.slice(2);
  nodes = {};
  for (let i = 0; i < lines.length; i++) {
    const [node, L, R] = lines[i].split(/ = \(|, |\)/);
    nodes[node] = {
      L,
      R,
    };
  }

  let steps = 0;
  let currentNode = "AAA";
  while (true) {
    currentNode = nodes[currentNode][instructions[steps % instructions.length]];
    steps++;
    if (currentNode === "ZZZ") {
      break;
    }
  }

  console.log("instructions: ", instructions);
  console.log("nodes: ", nodes);
  console.log("steps: ", steps);
};
