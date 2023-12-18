import {
    CARDINAL,
    CARDINAL_VECTOR2,
    DIRECTION,
    DIRECTION_CARDINAL,
    ITERM_SET_MARK,
    Vector2,
    parseIntMap,
    rangedArray,
} from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
// const grid = lines.map((l) => [...l].map(parseIntMap));

let r = 0;
let here = new Vector2<number>(0, 0);
const edges = new Set<string>(["[0,0]"]);

let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [d, amt, colour] = line.split(" ");

    const dir = DIRECTION_CARDINAL[d as DIRECTION];
    const v = CARDINAL_VECTOR2[dir];

    console.log(v.toString(), amt);

    for (let i = 0; i < parseInt(amt); i++) {
        here.add(v);
        edges.add(here.toString());

        if (here.x < minX) {
            minX = here.x;
        } else if (here.x > maxX) {
            maxX = here.x;
        }
        if (here.y < minY) {
            minY = here.y;
        } else if (here.y > maxY) {
            maxY = here.y;
        }
    }
}

console.log(edges);
console.log("edges", edges.size);

const dug2 = new Set<string>();
for (let i = minX; i < maxX + 1; i++) {
    for (let j = minY; j < maxY + 1; j++) {
        const v = new Vector2(i, j);
        if (edges.has(v.toString())) {
            dug2.add(v.toString());
            continue;
        }
        let walls = [];
        let x = i;
        let y = j;
        while (x < maxX + 1 && y < maxY + 1) {
            const newV = new Vector2(x, y);
            if (
                edges.has(newV.toString()) &&
                !(
                    edges.has(
                        newV.clone().subtract(CARDINAL_VECTOR2.E).toString(),
                    ) &&
                    edges.has(
                        newV.clone().subtract(CARDINAL_VECTOR2.S).toString(),
                    )
                ) &&
                !(
                    edges.has(
                        newV.clone().subtract(CARDINAL_VECTOR2.W).toString(),
                    ) &&
                    edges.has(
                        newV.clone().subtract(CARDINAL_VECTOR2.N).toString(),
                    )
                )
            ) {
                walls.push(newV.toString());
            }
            x++;
            y++;
        }
        if (walls.length % 2 === 1) {
            dug2.add(v.toString());
        }
    }
}

// for (let j = minY; j < maxY + 1; j++) {
//     for (let i = minX; i < maxX + 1; i++) {
//         let v = new Vector2(i, j);
//         if (!edges.has(v.toString())) {
//             continue;
//         }
//         do {
//             dug2.add(v.toString());

//             i++;
//             v = new Vector2(i, j);
//             r++;
//         } while (edges.has(v.toString()));

//         while (!edges.has(v.toString()) && i < maxX + 1) {
//             dug2.add(v.toString());
//             i++;
//             v = new Vector2(i, j);
//             r++;
//         }

//         if (v.x < maxX + 1) {
//             dug2.add(v.toString());
//         }
//         r++;
//     }
// }

const grid = rangedArray(maxY + 1, minY).map((_) =>
    rangedArray(maxX + 1, minX).map((_) => "."),
);
for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
        const v = new Vector2(i + minX, maxY - j);
        if (edges.has(v.toString())) {
            grid[j][i] = "$";
        } else if (dug2.has(v.toString())) {
            grid[j][i] = "#";
        }
    }
}

console.log(grid.map((l) => l.join("")).join("\n"));
console.log(minX, minY, maxX, maxY);
console.log(dug2.size);
console.log(r);
console.log("------", ITERM_SET_MARK);
