import input from "./input.txt";
import { rangedArray } from "@utils";

const lines = input.split("\n");

let overlaps = 0;
for (const line of lines) {
    if (line === "") break;
    const [a, b] = line
        .split(",")
        .map((elf) => elf.split("-").map((n) => parseInt(n)))
        .map(([min, max]) => rangedArray(max + 1, min));
    const aSet = new Set(a);
    for (const n of b) {
        if (aSet.has(n)) {
            overlaps++;
            break;
        }
    }
}

console.log(overlaps);
