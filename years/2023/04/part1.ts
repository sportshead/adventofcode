import input from "./input.txt";
import { parseIntMap } from "@utils";

const lines = input.split("\n");

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    let matches = 0;
    const groups = line.match(/^Card.+:([\d ]+) \| ([\d ]+)$/);
    if (!groups) throw line;
    const winners = groups[1]
        .split(" ")
        .filter((n) => !!n)
        .map(parseIntMap);
    const ours = groups[2]
        .split(" ")
        .filter((n) => !!n)
        .map(parseIntMap);

    console.log(groups, winners, ours);
    for (const n of ours) {
        if (winners.includes(n)) {
            matches++;
        }
    }
    if (matches !== 0) {
        r += Math.pow(2, matches - 1);
    }
}

console.log(r);
console.log("------");
