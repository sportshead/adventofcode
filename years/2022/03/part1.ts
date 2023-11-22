import input from "./input.txt";
import { LOWERCASE, UPPERCASE } from "@utils";

const lines = input.split("\n");

const chars = "_" + LOWERCASE + UPPERCASE;

let answer = 0;
for (const line of lines) {
    const middle = line.length / 2;
    const firstHalf = line.substring(0, middle);
    const lastHalf = line.substring(middle);

    const seenInFirst = new Set();
    const both = new Set();

    for (const c of [...firstHalf]) {
        seenInFirst.add(c);
    }
    for (const c of [...lastHalf]) {
        if (seenInFirst.has(c)) {
            both.add(c);
        }
    }

    [...both].map((c) => (answer += chars.indexOf(c)));
}
console.log(answer);
