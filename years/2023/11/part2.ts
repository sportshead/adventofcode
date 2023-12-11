import input from "./input.txt";
import { Vector2 } from "@utils";

const lines = input.trimEnd().split("\n");

let grid: string[][] = lines.map((l) => [...l]);

let emptyRows = new Set<number>();
let emptyCols = new Set<number>();

let r = 0;
for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    if (!line.includes("#")) {
        emptyRows.add(i);
    }
}

for (let i = 0; i < grid[0].length; i++) {
    let empty = true;
    for (let j = 0; j < grid.length; j++) {
        if (grid[j][i] === "#") {
            empty = false;
            break;
        }
    }
    if (empty) {
        emptyCols.add(i);
    }
}

const galaxies = new Set<string>();

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === "#") {
            galaxies.add(JSON.stringify(new Vector2(x, y)));
        }
    }
}
console.log(galaxies);

const walk = (a: Vector2, b: Vector2): number => {
    let add = 0;
    for (const row of emptyRows) {
        if (Math.min(a.y, b.y) < row && Math.max(a.y, b.y) > row) {
            add += 1e6 - 1;
        }
    }
    for (const col of emptyCols) {
        if (Math.min(a.x, b.x) < col && Math.max(a.x, b.x) > col) {
            add += 1e6 - 1;
        }
    }
    return Math.abs(a.distanceX(b)) + Math.abs(a.distanceY(b)) + add;
};

for (const i of galaxies) {
    const vecI = Vector2.fromJSON<number>(i);
    for (const j of galaxies) {
        if (i === j) continue;
        const vecJ = Vector2.fromJSON<number>(j);
        const dist = walk(vecI, vecJ);
        r += dist;
    }
}

console.log(r / 2);
console.log("------");
