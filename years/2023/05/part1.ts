import input from "./input.txt";
import { parseIntMap } from "@utils";

const lines = input.split("\n");

let r = 0;

let seeds = lines[0]
    .match(/seeds: ([ \d]+)/)![1]
    .split(" ")
    .map(parseIntMap);
console.log(seeds);

let maps = {};
let section = "";
let newSeeds: number[] = [...seeds];
for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
        seeds = newSeeds;
        newSeeds = [...seeds];
        i++;
        continue;
    }
    const [_, dest, src, len] = line
        .match(/(\d+) (\d+) (\d+)/)!
        .map(parseIntMap);

    console.log(dest, src, len);
    for (let j = 0; j < seeds.length; j++) {
        if (seeds[j] >= src && seeds[j] <= src + len) {
            newSeeds[j] = dest + (seeds[j] - src);
        }
    }
    console.log(seeds);
}

console.log(seeds.reduce((acc, cur) => Math.min(acc, cur), 1e999));
console.log("------");
