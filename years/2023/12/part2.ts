import input from "./input.txt";
import { cache, parseIntMap, sumReducer } from "@utils";

const lines = input.split("\n");

const getPossible = cache((test: string, n: number[]): number => {
    if (test === "") {
        return n.length ? 0 : 1;
    }

    if (!n.length) {
        return test.includes("#") ? 0 : 1;
    }

    if (test.length < n.reduce(sumReducer) + n.length - 1) {
        return 0;
    }

    if (test.charAt(0) === "?") {
        return (
            getPossible("." + test.slice(1), n) +
            getPossible("#" + test.slice(1), n)
        );
    }

    if (test.charAt(0) === ".") {
        const repl = test.replace(/^\.+/, "");
        return getPossible(repl, n);
    }

    if (test.charAt(0) === "#") {
        if (test.slice(0, n[0]).includes(".") || test.charAt(n[0]) === "#") {
            return 0;
        }
        return getPossible(test.slice(n[0] + 1), n.slice(1));
    }

    console.error(test, n);
    throw test;
});

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const [_, _springs, n] = line.match(/([.#?]+) ([\d,]+)/)!;

    const ns = (n + ",")
        .repeat(5)
        .split(",")
        .filter((n) => !!n)
        .map(parseIntMap);
    const springs = (_springs + "?").repeat(5).replace(/\?$/, "");

    r += getPossible(springs, ns);
    console.log(r, springs, ns);
    console.log("==");
}

console.log(getPossible._cache.size);
console.log(r);
console.log("------");
