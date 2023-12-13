import input from "./input.txt";
import "@mut/string.ts";
import { transpose } from "@utils";

const lines = input.trimEnd().split("\n\n");

const reflect = (ll: string[], old: number): number => {
    for (let i = 1; i < ll[0].length; i++) {
        if (
            i !== old &&
            ll.every((n) => {
                let a = n.slice(0, i);
                let b = n.slice(i);

                if (a.length > b.length) {
                    a = a.slice(a.length - b.length);
                } else {
                    b = b.slice(0, a.length);
                }

                b = b.reverse();

                return a === b;
            })
        ) {
            return i;
        }
    }
    return -1;
};

const solve = (ll: string[], old: number): number => {
    const row = reflect(ll, old);
    if (row !== -1 && row !== old) {
        return row;
    } else {
        const col = reflect(
            transpose(ll.map((l) => [...l])).map((l) => l.join("")),
            old / 100,
        );
        if (col !== -1 && col * 100 !== old) {
            return col * 100;
        }
    }
    return -1;
};

const loop = (grp: string) => {
    const ll = grp.split("\n").map((l) => [...l]);

    const oldScore = solve(
        ll.map((l) => l.join("")),
        -1,
    );

    if (oldScore === -1) {
        console.error(grp);
        throw oldScore;
    }
    console.log(grp, oldScore);

    for (let y = 0; y < ll.length; y++) {
        for (let x = 0; x < ll[0].length; x++) {
            if (ll[y][x] === ".") {
                continue;
            }
            ll[y][x] = ".";
            const score = solve(
                ll.map((l) => l.join("")),
                oldScore,
            );
            if (score !== -1) {
                console.log(ll.map((l) => l.join("")).join("\n"), score);
                console.log("--");
                return score;
            }
            ll[y][x] = "#";
        }
    }

    console.error(grp);
    throw 1;
};

let r = 0;
for (const grp of lines) {
    r += loop(grp);
}
console.log(r);
console.log("------");
