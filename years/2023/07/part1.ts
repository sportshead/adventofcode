import input from "./input.txt";
import { sumReducer } from "@utils";

const lines = input.split("\n");

const CARDS = "_23456789TJQKA";

let r = 0;
let hands: [number, string, string][] = [];
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
    const vals = [...chars.values()];
    if (vals.includes(5)) {
        power = 20;
    } else if (vals.includes(4)) {
        power = 17;
    } else if (vals.includes(3)) {
        if (vals.includes(2)) {
            power = 13;
        } else {
            power = 10;
        }
    } else if (vals.includes(2)) {
        if (vals.filter((n) => n === 2).length === 2) {
            power = 7;
        } else {
            power = 3;
        }
    } else {
        power = 1;
    }

    hands.push([power, bid, hand]);
    //console.log(power);
}
const sortChar = (a: string, b: string): number => {
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
console.log(hands);
console.log(hands.map(([_, bid], i) => bid * (i + 1)).reduce(sumReducer));
console.log("------");
