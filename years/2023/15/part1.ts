import input from "./input.txt";
import { sumReducer } from "@utils";

const hash = (str: string) => {
    let n = 0;
    for (const c of [...str]) {
        n += c.charCodeAt(0);
        n *= 17;
        n = n % 256;
    }
    return n;
};

const lines = input.trim().split("\n");

console.log(lines[0].split(",").map(hash).reduce(sumReducer));

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
}

console.log(r);
console.log("------");
