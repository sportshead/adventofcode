import input from "./input.txt";
import { parseIntMap } from "@utils";

const lines = input.split("\n");

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    let extraps = [line.split(" ").map(parseIntMap)];
    let n = 0;
    while (true) {
        console.log(extraps[n]);
        const ext = extraps[n];
        const newE = [];
        for (let j = 0; j < ext.length - 1; j++) {
            newE.push(ext[j + 1] - ext[j]);
        }
        console.log(newE);
        extraps.push(newE);

        if (newE.every((n) => n === 0)) {
            break;
        }
        n++;
    }

    extraps[extraps.length - 1].unshift(0);
    for (let j = extraps.length - 2; j >= 0; j--) {
        extraps[j].unshift(extraps[j][0] - extraps[j + 1][0]);
    }
    console.log(extraps[0]);
    r += extraps[0][0];
    console.log("--");
}

console.log(r);
console.log("------");
