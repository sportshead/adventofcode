import { CARDINAL, CARDINAL_VECTOR2, Vector2 } from "@utils";
import { join } from "path";

const input = await Bun.file(join(import.meta.dir, "./input.txt")).text();

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);

console.log(lines.join("\n"));

const energised = new Set<string>(["[0,0]"]);

let beams: [Vector2<number>, CARDINAL][] = [
    [new Vector2(-1, 0), CARDINAL.EAST],
];

const knownBeams = new Set<string>([JSON.stringify(beams[0])]);
let r = 0;

while (beams.length) {
    console.log(JSON.stringify(beams));
    let newBeams: typeof beams = [];
    for (let i = 0; i < beams.length; i++) {
        const beam = beams[i];
        knownBeams.add(JSON.stringify(beam));
        const v = beam[0].clone().add(CARDINAL_VECTOR2[beam[1]]);

        let newDir = beam[1];

        const cell = grid[v.y]?.[v.x];
        if (cell) {
            energised.add(v.toString());

            switch (cell) {
                case "/":
                    if (beam[1] === CARDINAL.EAST) {
                        newDir = CARDINAL.SOUTH;
                    } else if (beam[1] === CARDINAL.WEST) {
                        newDir = CARDINAL.NORTH;
                    } else if (beam[1] === CARDINAL.SOUTH) {
                        newDir = CARDINAL.EAST;
                    } else {
                        newDir = CARDINAL.WEST;
                    }

                    break;
                case "\\":
                    if (beam[1] === CARDINAL.EAST) {
                        newDir = CARDINAL.NORTH;
                    } else if (beam[1] === CARDINAL.WEST) {
                        newDir = CARDINAL.SOUTH;
                    } else if (beam[1] === CARDINAL.SOUTH) {
                        newDir = CARDINAL.WEST;
                    } else {
                        newDir = CARDINAL.EAST;
                    }
                    break;

                case "|":
                    if (
                        beam[1] === CARDINAL.EAST ||
                        beam[1] === CARDINAL.WEST
                    ) {
                        newDir = CARDINAL.NORTH;
                        newBeams.push([v.clone(), CARDINAL.SOUTH]);
                    }
                    break;

                case "-":
                    if (
                        beam[1] === CARDINAL.NORTH ||
                        beam[1] === CARDINAL.SOUTH
                    ) {
                        newDir = CARDINAL.EAST;
                        newBeams.push([v.clone(), CARDINAL.WEST]);
                    }
                    break;
            }

            newBeams.push([v, newDir]);
        }
    }
    beams = newBeams.filter((n) => !knownBeams.has(JSON.stringify(n)));
    console.log("--");
}

console.log(knownBeams);
const DIR_CHAR: Record<string, string> = {
    [CARDINAL.NORTH]: "v",
    [CARDINAL.SOUTH]: "^",
    [CARDINAL.EAST]: ">",
    [CARDINAL.WEST]: "<",
};
for (const beam of knownBeams.keys()) {
    const [[x, y], dir] = <[[number, number], CARDINAL]>JSON.parse(beam);

    const cell = grid[y][x];
    const n = parseInt(cell);
    if (!cell) continue;
    if ("^v<>".includes(cell)) {
        grid[y][x] = "2";
    } else if (!isNaN(n)) {
        grid[y][x] = (n + 1).toString();
    } else {
        grid[y][x] = DIR_CHAR[dir];
    }
}
console.log(grid.map((l) => l.join("")).join("\n"));
console.log("---");
for (const e of energised.keys()) {
    const [x, y] = JSON.parse(e);
    grid[y][x] = "#";
}
console.log(grid.map((l) => l.join("")).join("\n"));
console.log(energised, energised.size);
console.log("------");
