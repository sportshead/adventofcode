import input from "./input.txt";
import { LOWERCASE, UPPERCASE } from "../../../utils/consts.ts";

const lines = input.split("\n");

const chars = "_" + LOWERCASE + UPPERCASE;

let answer = 0;
for (let i = 0; i < lines.length - 1; i += 3) {
    const seenInFirst = new Set();
    const both = new Set();
    let final = "";
    for (const c of [...lines[i]]) {
        seenInFirst.add(c);
    }
    for (const c of [...lines[i + 1]]) {
        if (seenInFirst.has(c)) {
            both.add(c);
        }
    }
    for (const c of [...lines[i + 2]]) {
        if (both.has(c)) {
            final = c;
            console.log("got final", final);
            break;
        }
    }
    answer += chars.indexOf(final);
}
console.log(answer);
