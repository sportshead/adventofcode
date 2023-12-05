import input from "./input.txt";
import { parseIntMap, sumReducer } from "@utils";

const lines = input.split("\n");

let inc = new Array(lines.length).fill(1);
let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    let matches = 0;
    const groups = line.match(/^Card[ \t]+(\d+):([\d ]+) \| ([\d ]+)$/);
    if (!groups) throw line;
    const cardN = parseInt(groups[1]) - 1;
    const winners = groups[2]
        .split(" ")
        .filter((n) => !!n)
        .map(parseIntMap);
    const ours = groups[3]
        .split(" ")
        .filter((n) => !!n)
        .map(parseIntMap);

    console.log(cardN, groups, winners, ours);
    for (const n of ours) {
        if (winners.includes(n)) {
            matches++;
        }
    }
    for (let j = i + 1; j < i + 1 + matches; j++) {
        inc[j] = (inc[j] ?? 0) + inc[cardN];
    }
    console.log(matches, inc);
}

console.log(inc);
console.log(inc.reduce(sumReducer) - 1);
console.log("------");
