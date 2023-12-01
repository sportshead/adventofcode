import input from "./input.txt";
import { DIGITS_WORDS } from "@utils";

const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line === "") break;
    let matches = [];
    for (let i = 0; i < line.length; i++) {
        let n = parseInt(line.charAt(i));
        let word = DIGITS_WORDS.findIndex((v) => line.slice(i).startsWith(v));
        let match = isNaN(n) ? (word === -1 ? null : word) : n;
        if (match != null) {
            sum += match * 10;
            matches.push(match);
            break;
        }
    }
    for (let i = line.length - 1; i > -1; i--) {
        let n = parseInt(line.charAt(i));
        let word = DIGITS_WORDS.findIndex((v) => line.slice(i).startsWith(v));
        let match = isNaN(n) ? (word === -1 ? null : word) : n;
        if (match != null) {
            sum += match;
            matches.push(match);
            break;
        }
    }
    console.log(line, matches);
}

console.log(sum);
console.log("------");
