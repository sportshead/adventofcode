import input from "./input.txt";
import { parseIntMap } from "@utils";

const lines = input.split("\n");

// @ts-ignore
const times = [...lines[0].matchAll(/\d+/g)].flatMap(parseIntMap);
// @ts-ignore
const dists = [...lines[1].matchAll(/\d+/g)].flatMap(parseIntMap);
console.log(times, dists);

let r = 1;

for (let i = 0; i < times.length; i++) {
    const dist = dists[i];
    const time = times[i];

    let b = 0;
    for (let j = 0; j < time; j++) {
        const speed = j;
        const trav = (time - j) * speed;
        if (trav > dist) {
            b++;
        }
    }
    console.log(b);
    r *= b;
}

console.log(r);
console.log("------");
