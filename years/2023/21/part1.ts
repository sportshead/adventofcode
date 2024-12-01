import {
    CARDINAL,
    CARDINAL_VECTOR2,
    ITERM_SET_MARK,
    Vector2,
    parseIntMap,
} from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);

const startY = grid.findIndex((n) => n.includes("S"));
const startX = grid[startY].findIndex((n) => n === "S");
const start = new Vector2(startX, startY);

let r = 0;
const desiredSteps = 64;
let nextPos = new Set([start.toString()]);
for (let i = 0; i < desiredSteps; i++) {
    const newPos = new Set<string>();
    const DIRS = [CARDINAL.NORTH, CARDINAL.EAST, CARDINAL.SOUTH, CARDINAL.WEST];

    for (const pp of nextPos) {
        const p = Vector2.fromJSON<number>(pp);
        for (const d of DIRS) {
            const v = p.clone().add(CARDINAL_VECTOR2[d]);
            if (grid[v.y]?.[v.x] === "." || grid[v.y]?.[v.x] === "S") {
                newPos.add(v.toString());
            }
        }
    }

    nextPos = newPos;
}

console.log(nextPos.size);
console.log(r);
console.log("------", ITERM_SET_MARK);
