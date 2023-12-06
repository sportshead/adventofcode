import input from "./input.txt";
import { parseIntMap } from "@utils";

const lines = input.split("\n");

// @ts-ignore
const time = parseInt(
    [...lines[0].matchAll(/\d/g)]
        .flatMap((v) => v)
        .reduce((acc, cur) => acc + cur, ""),
);
// @ts-ignore
const dist = parseInt(
    [...lines[1].matchAll(/\d/g)]
        .flatMap((v) => v)
        .reduce((acc, cur) => acc + cur, ""),
);
console.log(time, dist);

let b = 0;
for (let j = 0; j < time; j++) {
    const speed = j;
    const trav = (time - j) * speed;
    if (trav > dist) {
        b++;
    }
}

console.log(b);
console.log("------");
