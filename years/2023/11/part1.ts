import input from "./input.txt";
import { Vector2 } from "@utils";

const lines = input.trimEnd().split("\n");

let grid: string[][] = [];

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    grid.push([...line]);
    if (!line.includes("#")) {
        grid.push([...line]);
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
        for (let j = 0; j < grid.length; j++) {
            let newGrid = grid[j].slice(0, i);
            newGrid.push(".", ...grid[j].slice(i));
            grid[j] = newGrid;
        }
        i++;
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
    return Math.abs(a.distanceX(b)) + Math.abs(a.distanceY(b));
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
console.assert(
    grid.map((n) => n.join("")).join("\n") ===
        `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`,
);
console.log("------");
