// used the output to determine the pattern of outputs, then dropped values into LCM calculator
// input has been manipulated to each start node reaches Z at a set N number of steps, so just need LCM of N values

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

  const startNodes = [];
  Object.keys(nodes).forEach((nodeName) => {
    if (nodeName.endsWith("A")) {
      startNodes.push(nodeName);
    }
  });

  let steps = 0;
  let currentNodes = startNodes;

  const solutions = [];
  for (let i = 0; i < currentNodes.length; i++) {
    solutions.push([]);
  }

  while (true) {
    for (let i = 0; i < currentNodes.length; i++) {
      currentNodes[i] =
        nodes[currentNodes[i]][instructions[steps % instructions.length]];
      if (currentNodes[i].endsWith("Z")) {
        solutions[i].push(steps + 1);
        console.log(solutions);
      }
    }
    steps++;
    if (
      currentNodes.filter((node) => node.endsWith("Z")).length ===
      currentNodes.length
    ) {
      break;
    }
  }

  console.log("steps: ", steps);
};
