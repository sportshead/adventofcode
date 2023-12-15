import input from "./input.txt";
import { sumReducer } from "@utils";

const hash = (str: string) => {
    let n = 0;
    for (const c of [...str]) {
        n += c.charCodeAt(0);
        n *= 17;
        n = n % 256;
    }
    return n;
};

const lines = input.trim().split("\n");
const map = new Map<number, Map<string, number>>();
lines[0].split(",").map((n) => {
    if (n.endsWith("-")) {
        const id = n.slice(0, n.length - 1);
        const hashed = hash(id);
        if (!map.has(hashed)) {
            map.set(hashed, new Map());
        }
        map.get(hashed)!.delete(id);
    } else {
        const [id, amt] = n.split("=");
        const hashed = hash(id);

        if (!map.has(hashed)) {
            map.set(hashed, new Map());
        }
        map.get(hashed)!.set(id, parseInt(amt));
    }
});
console.log(map);

let r = 0;

for (const [boxId, box] of map.entries()) {
    const arr = [...box.values()];

    for (let i = 0; i < arr.length; i++) {
        console.log(r);
        r += (boxId + 1) * (i + 1) * arr[i];
    }
}
console.log(r);
console.log("------");
