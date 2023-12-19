import { ITERM_SET_MARK, parseIntMap } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input
    .trim()
    .split("\n\n")
    .map((n) => n.split("\n"));
const grid = lines.map((l) => [...l].map(parseIntMap));

let r = 0;

const parseMap = new Map<string, string[]>();

for (let i = 0; i < lines[0].length; i++) {
    const line = lines[0][i];
    if (line === "") {
        break;
    }

    // px{a<2006:qkq,m>2090:A,rfg}
    const [_, id, match] = line.match(/(\w+)\{(.+)\}/)!;
    const rules = match.split(",");

    parseMap.set(id, rules);
}

const firstRule = "in";
console.log(parseMap);

for (let i = 0; i < lines[1].length; i++) {
    const line = lines[1][i];
    if (line === "") {
        break;
    }

    // {x=787,m=2655,a=1222,s=2876}
    const [_, x, m, a, s] = line
        .match(/\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}/)!
        .map(parseIntMap);

    const sum = x + m + a + s;
    console.log(line, sum);
    let here = firstRule;
    while (!["R", "A"].includes(here)) {
        const rules = parseMap.get(here)!;
        for (const r of rules) {
            const spl = r.split(":");
            if (spl.length > 1) {
                if (eval(`(x,m,a,s)=>${spl[0]}`)(x, m, a, s)) {
                    here = spl[1];
                    break;
                }
            } else {
                here = r;
                break;
            }
        }
    }
    if (here === "A") {
        console.log(line, x, m, a, s, sum);
        r += sum;
    }
}

console.log(r);
console.log("------", ITERM_SET_MARK);
