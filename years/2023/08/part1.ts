import input from "./input.txt";

const lines = input.split("\n");

const directions = [...lines[0]];

let r = 0;
const map = new Map<string, [string, string]>();
for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    const [_, here, left, right] = line.match(
        /(\w\w\w) = \((\w\w\w), (\w\w\w)\)/,
    )!;
    console.log(here, left, right);
    map.set(here, [left, right]);
}
let here = "AAA";
while (true) {
    for (let dir of directions) {
        if (here === "ZZZ") {
            throw r;
        }
        here = map.get(here)!["LR".indexOf(dir)];
        r++;
    }
}

console.log(r);
console.log("------");
