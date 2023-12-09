// seems like in this new version, we can't just store every value in an array since we'll run out of memory
// instead, let's loop through each seed value, and track the minimum location so far

const fs = require("node:fs");
const path = require("node:path");
const util = require("node:util");
const cliProgress = require("cli-progress");

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

// create a new progress bar instance and use shades_classic theme
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let mappings = [];

// start the progress bar with a total value of 200 and start value of 0

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

  let totalSeeds = 0;
  for (let i = 1; i < seeds.length; i = i + 2) {
    totalSeeds += seeds[i];
  }
  bar1.start(totalSeeds, 0);

  lines = lines.slice(2);

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

  let minLocation = Infinity;
  let iterationCount = 0;

  for (let i = 0; i < seeds.length; i = i + 2) {
    const startAt = seeds[i];
    const endAt = seeds[i] + seeds[i + 1];
    for (let j = startAt; j < endAt; j++) {
      const seedLoc = convertSeedToLocation(j);
      if (seedLoc < minLocation) {
        minLocation = seedLoc;
        console.log(" | new minLocation: ", minLocation, "seed: ", j);
      }
      iterationCount++;
      if (iterationCount % 1000 == 0) {
        bar1.update(iterationCount);
      }
    }
  }
  bar1.update(totalSeeds);
  bar1.stop();

  console.log("minLocation: ", minLocation);
};

const convertSeedToLocation = (seed) => {
  let location = seed;
  for (let i = 0; i < TRANSITIONS.length - 1; i++) {
    const maps = mappings.find((map) => map.from == TRANSITIONS[i]).mappings;
    for (const map of maps) {
      if (location >= map.rangeStart && location < map.rangeEnd) {
        location += map.offset;
        break;
      }
    }
  }
  return location;
};
