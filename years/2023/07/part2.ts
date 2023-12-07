import input from "./input.txt";
import { sortDescending, sumReducer } from "@utils";

const lines = input.split("\n");

const CARDS = "J23456789TJQKA";

let r = 0;
let hands: [number, number, string][] = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    let power = 0;

    const [hand, bid] = line.split(" ");
    const chars = new Map<string, number>();
    for (const n of [...hand]) {
        chars.set(n, (chars.get(n) ?? 0) + 1);
    }
    //console.log(hand, bid, chars);
    const joke = chars.get("J") ?? 0;
    chars.delete("J");
    const vals = [...chars.values()].sort(sortDescending);
    if (vals[0] + joke === 5 || joke === 5) {
        power = 20;
    } else if (vals[0] + joke === 4) {
        power = 17;
    } else if (vals[0] + joke === 3) {
        let jR = joke - (3 - vals[0]);
        if (vals[1] + jR === 2) {
            power = 13;
        } else {
            power = 10;
        }
    } else if (vals[0] + joke === 2) {
        let jR = joke - (2 - vals[0]);
        //console.log(vals, jR);
        if (vals[1] + jR === 2) {
            power = 7;
        } else {
            power = 3;
        }
    } else {
        power = 1;
    }

    hands.push([power, parseInt(bid), hand]);
    console.log(hand, power);
}
const sortChar = (a: string, b: string) => {
    for (let i = 0; i < a.length; i++) {
        const j = CARDS.indexOf(a.charAt(i));
        const k = CARDS.indexOf(b.charAt(i));
        if (j - k !== 0) {
            return j - k;
        }
    }
    return 0;
};
hands = hands.sort(([a, _1, aH], [b, _2, bH]) =>
    a - b === 0 ? sortChar(aH, bH) : a - b,
);
//console.log(hands);
console.log(hands.map(([_, bid], i) => bid * (i + 1)).reduce(sumReducer));
console.log("------");
