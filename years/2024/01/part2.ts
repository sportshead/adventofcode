import { ITERM_SET_MARK, parseIntMap } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input
    .trim()
    .split("\n")
    .map((l) => l.split("   "));

let a = [];
let b = [];

for (const [a1, b1] of lines) {
    a.push(parseInt(a1));
    b.push(parseInt(b1));
}

a = a.sort();
b = b.sort();

console.log(a, b);

let m: Record<number, number> = {};
for (let i = 0; i < a.length; i++) {
    m[b[i]] = (m[b[i]] ?? 0) + 1;
}

let r = 0;
for (let i = 0; i < a.length; i++) {
    r += a[i] * (m[a[i]] ?? 0);
}

console.log(r);
console.log("------", ITERM_SET_MARK);
