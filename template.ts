import { ITERM_SET_MARK, parseIntMap } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l].map(parseIntMap));

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
}

console.log(r);
console.log("------", ITERM_SET_MARK);
