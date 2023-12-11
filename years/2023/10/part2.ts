import input from "./input.txt";
import { CARDINAL_VECTOR2, rangedArray, Vector2 } from "@utils";

const lines = input
    .trim()
    .split("\n")
    .map((n) => [...n]);

let y = lines.findIndex((n) => n.includes("S"));
let x = lines[y].indexOf("S");
let last = new Vector2(x, y);
let here = new Vector2(x, y);
console.log(x, y);

const eq = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const pipes = new Set();
pipes.add(JSON.stringify(here));
for (const vec of Object.values(CARDINAL_VECTOR2)) {
    const a = here.clone().add(vec);
    if (lines[a.y][a.x] === "." || !lines[a.y][a.x]) {
        continue;
    }
    here = a;

    pipes.add(JSON.stringify(here));
    let n = 1;
    while (lines[here.y][here.x] !== "S") {
        n++;
        const h = here.clone();
        const diff = here.clone().subtract(last);
        if (!lines[here.y][here.x]) {
            console.error(JSON.stringify(here), JSON.stringify(diff), n);
            throw 2;
        }
        /*console.log(
            JSON.stringify(here),
            lines[here.y][here.x],
            JSON.stringify(diff),
        );*/
        switch (lines[here.y][here.x]) {
            case "|":
                if (eq(diff, CARDINAL_VECTOR2.S)) {
                    here.add(CARDINAL_VECTOR2.S);
                } else {
                    here.add(CARDINAL_VECTOR2.N);
                }
                break;
            case "-":
                if (eq(diff, CARDINAL_VECTOR2.W)) {
                    here.add(CARDINAL_VECTOR2.W);
                } else {
                    here.add(CARDINAL_VECTOR2.E);
                }
                break;
            case "L":
                if (eq(diff, CARDINAL_VECTOR2.W)) {
                    here.add(CARDINAL_VECTOR2.S);
                } else {
                    here.add(CARDINAL_VECTOR2.E);
                }
                break;
            case "J":
                if (eq(diff, CARDINAL_VECTOR2.E)) {
                    here.add(CARDINAL_VECTOR2.S);
                } else {
                    here.add(CARDINAL_VECTOR2.W);
                }
                break;
            case "7":
                if (eq(diff, CARDINAL_VECTOR2.E)) {
                    here.add(CARDINAL_VECTOR2.N);
                } else {
                    here.add(CARDINAL_VECTOR2.W);
                }
                break;
            case "F":
                if (eq(diff, CARDINAL_VECTOR2.S)) {
                    here.add(CARDINAL_VECTOR2.E);
                } else {
                    here.add(CARDINAL_VECTOR2.N);
                }
                break;
            case ".":
                console.error(JSON.stringify(here), JSON.stringify(vec), n);
                throw 1;
        }
        pipes.add(JSON.stringify(here));
        //console.log(di, n, dists);
        last = h;
    }

    console.log(JSON.stringify(here), JSON.stringify(last), n / 2);
    console.log("--");
    break;
}
//dists.delete(JSON.stringify(new Vector2(x, y)));
//console.log([...dists.values()].reduce(findHighestReducer, Number.MIN_VALUE));

const checkInside = (x: number, y: number): boolean => {
    if (lines[y][x] === "I") console.log(x, y);
    const coord = new Vector2(x, y);
    if (pipes.has(JSON.stringify(coord))) {
        return false;
    }
    let hits = [];
    let i = x;
    let j = y;
    while (i < lines[0].length && j < lines.length) {
        const vec = new Vector2(i, j);
        if (lines[y][x] === "I")
            console.log(JSON.stringify(vec), pipes.has(JSON.stringify(vec)));
        if (
            pipes.has(JSON.stringify(vec)) &&
            !"L7".includes(lines[vec.y][vec.x])
        ) {
            hits.push(JSON.stringify(vec));
        }
        i++;
        j++;
    }
    if (lines[y][x] === "I") console.log(hits);
    if (hits.length % 2 === 1) {
        console.log(x, y, hits);
        lines[y][x] = "I";
    }
    return hits.length % 2 === 1;
};

console.log(pipes);
let r = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (checkInside(j, i)) {
            r++;
        }
    }
}
console.log(lines.map((l) => l.join("")).join("\n"));
console.log(r);
console.log("------");
