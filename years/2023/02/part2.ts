import input from "./input.txt";
import { productReducer } from "@utils";

const lines = input.split("\n");

const colours = ["red", "green", "blue"];

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    let matches = line.match(/^Game (\d+): (.+)$/);
    let splitted = matches![2].split("; ").map((show) => show.split(", "));

    const c = [0, 0, 0];
    for (const round of splitted) {
        for (const show of round) {
            const s = show.split(" ");
            const n = parseInt(s[0]);
            const col = colours.indexOf(s[1]);
            if (n > c[col]) {
                c[col] = n;
            }
        }
        console.log(c);
    }
    r += c.reduce(productReducer, 1);
}

console.log(r);
console.log("------");
