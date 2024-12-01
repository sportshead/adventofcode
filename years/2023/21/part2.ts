import {
    CARDINAL,
    CARDINAL_VECTOR2,
    ITERM_SET_MARK,
    Vector2,
    cacheJSON,
} from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);

const startY = grid.findIndex((n) => n.includes("S"));
const startX = grid[startY].findIndex((n) => n === "S");
const start = new Vector2(startX, startY);

const DIRS = [CARDINAL.NORTH, CARDINAL.EAST, CARDINAL.SOUTH, CARDINAL.WEST];

const walk = cacheJSON((start: Vector2, steps: number): string[] => {
    const s = new Set<string>();
    if (steps === 0) {
        return [start.toString()];
    }

    // const gy = superMod(start.y, grid.length);
    // const gx = superMod(start.x, grid[0].length);
    // const gv = new Vector2(gx, gy);

    // const ddy = superDiv(start.y, grid.length);
    // const ddx = superDiv(start.x, grid[0].length);
    // const ddv = new Vector2(ddy * grid.length, ddx * grid[0].length);

    // const dx = start.distanceX(gv);
    // const dy = start.distanceY(gv);
    // const dv = new Vector2(dx, dy);

    const ps = getPossible(start);

    for (const p of ps) {
        const v = Vector2.fromJSON<number>(p);
        const w = walk(v, steps - 1);
        for (const ww of w) {
            // const wv = Vector2.fromJSON<number>(ww).add(dv);
            // s.add(wv.toString());
            s.add(ww);
        }
    }

    return [...s];
});

const getPossible = cacheJSON((p: Vector2): string[] => {
    const ret = [];
    for (const d of DIRS) {
        const v = p.clone().add(CARDINAL_VECTOR2[d]);
        const gy = superMod(start.y, grid.length);
        const gx = superMod(start.x, grid[0].length);
        // const gv = new Vector2(gx, gy);
        if (grid[gy]?.[gx] === "." || grid[gy]?.[gx] === "S") {
            ret.push(v.toString());
        }
    }
    return ret;
});

const superMod = (n: number, mod: number) =>
    n < 0 ? mod - ((n * -1 - 1) % mod) - 1 : n % mod;
const superDiv = (n: number, div: number) =>
    Math.floor(n < 0 ? n / div + 1 : n / div);

// console.log(superMod(-0, 5), superDiv(-0, 5));
// console.log(superMod(7, 5), superDiv(7, 5));
// console.log(superMod(12, 5), superDiv(12, 5));
// console.log(superMod(-1, 5), superDiv(-1, 5));
// console.log(superMod(-2, 5), superDiv(-2, 5));
// console.log(superMod(-5, 5), superDiv(-5, 5));
// console.log(superMod(-7, 5), superDiv(-7, 5));
// console.log(superMod(-12, 5), superDiv(-12, 5));

let r = 0;
const desiredSteps = 6;
// let nextPos = new Map([[start.toString(), 1]]);
// for (let i = 0; i < desiredSteps; i++) {
//     const newPos = new Map<string, number>();
//     const posss = new Set<string>();

//     for (const ppp of nextPos) {
//         const [pp, amt] = ppp;
//         const p = Vector2.fromJSON<number>(pp);

//         for (const d of DIRS) {
//             const v = p.clone().add(CARDINAL_VECTOR2[d]);
//             const gy = v.y % grid.length;
//             const gx = v.x % grid[0].length;
//             const gv = new Vector2(gy, gx);
//             const stt = v.toString();
//             if (
//                 !posss.has(stt) &&
//                 (grid[gy]?.[gx] === "." || grid[gy]?.[gx] === "S")
//             ) {
//                 const str = gv.toString();
//                 let n = amt;
//                 if (newPos.has(str)) {
//                     n += newPos.get(str)!;
//                 }
//                 newPos.set(str, n);
//                 posss.add(stt);
//             }
//         }
//     }

//     nextPos = newPos;
// }

// console.log(nextPos);
// console.log([...nextPos.values()].reduce(sumReducer));

const w = walk(start, desiredSteps);
console.log(w);
console.log("caches", getPossible._cache.size, walk._cache.size);
console.log("steps", desiredSteps, "locations", w.length);
console.log(r);
console.log("------", ITERM_SET_MARK);
