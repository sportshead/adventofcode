import input from "./input.txt";
import { lcmReducer } from "@utils";

const lines = input.split("\n");

const directions = [...lines[0]];

let r = 0;
const map = new Map<string, [string, string]>();
let heres: string[] = [];
for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    const [_, here, left, right] = line.match(
        /(\w\w\w) = \((\w\w\w), (\w\w\w)\)/,
    )!;
    console.log(here, left, right);
    map.set(here, [left, right]);
    if (here.endsWith("A")) {
        heres.push(here);
    }
}
let _heres = heres.map((here): number => {
    let r = 0;
    while (true) {
        for (let dir of directions) {
            if (here.endsWith("Z")) {
                return r;
            }
            here = map.get(here)!["LR".indexOf(dir)];
            r++;
        }
    }
});
/*while (true) {
    for (let dir of directions) {
        if (heres.every((n) => n.endsWith("Z"))) {
            throw r;
        }
        heres = heres.map((here) => map.get(here)!["LR".indexOf(dir)]);
        r++;
        console.log(heres);
        if (r === 100) {
            throw 1;
        }
        //if (r % 10 === 0) console.log(r);
    }
}*/

console.log(_heres.reduce(lcmReducer, 1));
console.log("------");
