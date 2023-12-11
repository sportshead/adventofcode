import input from "./input.txt";
import { CARDINAL_VECTOR2, findHighestReducer, Vector2 } from "@utils";

const lines = input.split("\n").map((n) => [...n]);

let y = lines.findIndex((n) => n.includes("S"));
let x = lines[y].indexOf("S");
let last = new Vector2(x, y);
let here = new Vector2(x, y);
console.log(x, y);

const eq = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const dists = new Map<string, number>();
for (const vec of Object.values(CARDINAL_VECTOR2)) {
    const a = here.clone().add(vec);
    if (lines[a.y][a.x] === "." || !lines[a.y][a.x]) {
        continue;
    }
    here = a;

    let n = 1;
    const di = dists.get(JSON.stringify(here));
    if ((di ?? Number.MAX_SAFE_INTEGER) > n) {
        dists.set(JSON.stringify(here), n);
    }
    //console.log(di, n, dists);
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
        const di = dists.get(JSON.stringify(here));
        if ((di ?? Number.MAX_SAFE_INTEGER) > n) {
            dists.set(JSON.stringify(here), n);
        }
        //console.log(di, n, dists);
        last = h;
    }

    last = new Vector2(x, y);
    here = new Vector2(x, y);
    console.log(n / 2);
    console.log("--");
    break;
}
//dists.delete(JSON.stringify(new Vector2(x, y)));
//console.log([...dists.values()].reduce(findHighestReducer, Number.MIN_VALUE));
console.log("------");
