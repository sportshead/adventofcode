import { CARDINAL, CARDINAL_VECTOR2, ITERM_SET_MARK, Vector2 } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
// const grid = lines.map((l) => [...l].map(parseIntMap));

let r = 1;
let here = new Vector2<number>(0, 0);
let edges = 0;

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

//  0 means R, 1 means D, 2 means L, and 3 means U.
const DIRS: Record<number, CARDINAL> = [
    CARDINAL.EAST,
    CARDINAL.NORTH,
    CARDINAL.WEST,
    CARDINAL.SOUTH,
];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [__, _, colour] = line.split(" ");

    const [___, hex, d] = colour.match(/([\dabcdef]{5})([\dabcdef])/)!;
    const amt = parseInt(hex, 16);

    console.log(hex, d, amt);
    const dir = DIRS[parseInt(d)];
    const v = CARDINAL_VECTOR2[dir].multiply(amt);

    console.log(v.toString(), amt, hex);
    here.add(v);
    r += amt / 2 + here.x * v.y;
}

// console.log(edges);
console.log("edges", edges);

console.log(minX, minY, maxX, maxY);
// const area =
//     shoelace([...edges.keys()].map((s) => Vector2.fromJSON<number>(s))) +
//     edges.size / 2 +
//     1;
// console.log("area", area);
console.log(r);
console.log("------", ITERM_SET_MARK);
