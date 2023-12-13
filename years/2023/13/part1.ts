import input from "./input.txt";
import "@mut/string.ts";
import { transpose } from "@utils";

const lines = input.trimEnd().split("\n\n");

let r = 0;
for (const grp of lines) {
    let done = false;
    let ll = grp.split("\n");

    for (let i = 1; i < ll[0].length; i++) {
        if (
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
            console.log(ll.join("\n"), i);
            done = true;
            r += i;
            break;
        }
    }

    if (done) {
        continue;
    }

    ll = transpose(ll.map((l) => [...l])).map((l) => l.join(""));
    for (let i = 1; i < ll[0].length; i++) {
        if (
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
            r += 100 * i;
            break;
        }
    }
}
console.log(r);
console.log("------");
