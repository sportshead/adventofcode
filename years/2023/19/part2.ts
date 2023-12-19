import { ITERM_SET_MARK, cache, cacheJSON, parseIntMap } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input
    .trim()
    .split("\n\n")
    .map((n) => n.split("\n"));

let r = 0;

const workflows = new Map<string, string[]>();

for (let i = 0; i < lines[0].length; i++) {
    const line = lines[0][i];
    if (line === "") {
        break;
    }

    const [_, id, match] = line.match(/(\w+)\{(.+)\}/)!;
    const rules = match.split(",");

    workflows.set(id, rules);
}

console.log(workflows);

// [min, max]
type Interval = [min: number, max: number];
type Keys = "x" | "m" | "a" | "s";
type Mapping = Record<Keys, Interval>;

const INVERT_SIGN = { "<": ">", ">": "<" };
const getAcceptable = cacheJSON((rules: string[]): Mapping[] => {
    if (rules[0] === "R") {
        return [];
    }
    if (rules[0] === "A") {
        return [
            {
                x: [1, 4000],
                m: [1, 4000],
                a: [1, 4000],
                s: [1, 4000],
            },
        ];
    }

    const match = rules[0].match(/^([xmas])([<>])(\d+):(\w+)$/);
    if (!match) {
        return getAcceptable(workflows.get(rules[0])!);
    }
    const [_, key, comp, valS, goto] = match as [
        string,
        Keys,
        "<" | ">",
        string,
        string,
    ];
    const val = parseInt(valS);

    return [
        ...narrow(key, comp, val, getAcceptable([goto])),
        ...narrow(
            key,
            INVERT_SIGN[comp],
            comp === ">" ? val + 1 : val - 1,
            getAcceptable(rules.slice(1)),
        ),
    ];
});

const narrow = (
    key: Keys,
    comp: string,
    val: number,
    mappings: Mapping[],
): Mapping[] => {
    const newMappings = [];
    for (const m of mappings) {
        const [min, max] = m[key];

        if (comp === ">") {
            m[key][0] = Math.max(min, val + 1);
        } else {
            m[key][1] = Math.min(max, val - 1);
        }

        if (min <= max) {
            newMappings.push(m);
        }
    }
    return newMappings;
};

// for (let i = 0; i < lines[1].length; i++) {
//     const line = lines[1][i];
//     if (line === "") {
//         break;
//     }

//     // {x=787,m=2655,a=1222,s=2876}
//     const [_, x, m, a, s] = line
//         .match(/\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}/)!
//         .map(parseIntMap);

//     const sum = x + m + a + s;
//     console.log(line, sum);
//     let here = firstRule;
//     while (!["R", "A"].includes(here)) {
//         const rules = parseMap.get(here)!;
//         for (const r of rules) {
//             const spl = r.split(":");
//             if (spl.length > 1) {
//                 if (eval(`(x,m,a,s)=>${spl[0]}`)(x, m, a, s)) {
//                     here = spl[1];
//                     break;
//                 }
//             } else {
//                 here = r;
//                 break;
//             }
//         }
//     }
//     if (here === "A") {
//         console.log(line, x, m, a, s, sum);
//         r += sum;
//     }
// }

// console.log(winners.size);

const acc = getAcceptable(workflows.get("in")!);
console.log(acc);
for (const m of acc) {
    let possible = 1;
    for (const key of ["x", "m", "a", "s"] as Keys[]) {
        possible *= m[key][1] - m[key][0] + 1;
    }
    r += possible;
}
console.log(r);
console.log("------", ITERM_SET_MARK);
