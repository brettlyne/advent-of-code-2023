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
  // console.log(lines);

  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((n) => parseInt(n));
  console.log("seeds: ", seeds);

  lines = lines.slice(2);
  console.log("lines: ", lines);
  let mappings = [];
  let currentMap = {};
  lines.forEach((line) => {
    if (line == "") {
      mappings.push(currentMap);
    } else if (line.includes("map:")) {
      let [from, to] = line.split(/\s|-to-/);
      currentMap = {
        from,
        to,
        mappings: [],
      };
    } else {
      let [target, rangeStart, extent] = line.split(/\s+/);
      currentMap.mappings.push({
        rangeStart: parseInt(rangeStart),
        rangeEnd: parseInt(rangeStart) + parseInt(extent),
        offset: parseInt(target) - parseInt(rangeStart),
      });
    }
  });
  console.log(util.inspect(mappings, { depth: Infinity }));

  const TRANSITIONS = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location",
  ];

  const locations = seeds.map((seed) => {
    for (let i = 0; i < TRANSITIONS.length - 1; i++) {
      console.log(TRANSITIONS[i] + ": ", seed);
      const maps = mappings.find((map) => map.from == TRANSITIONS[i]).mappings;
      for (const map of maps) {
        if (seed >= map.rangeStart && seed <= map.rangeEnd) {
          seed += map.offset;
          break;
        }
      }
    }
    return seed;
  });

  console.log("locations");
  console.log(locations);
  console.log("min: ", Math.min(...locations));
};
