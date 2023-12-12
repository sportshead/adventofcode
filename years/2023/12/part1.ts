import input from "./input.txt";

const lines = input.split("\n");
const check = (str: string) => {
    return str
        .split(".")
        .filter((n) => !!n)
        .map((n) => n.length.toString());
};

const arrEq = (a1: any, a2: any) => JSON.stringify(a1) === JSON.stringify(a2);

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const [_, springs, n] = line.match(/([.#?]+) ([\d,]+)/)!;

    const ns = n.split(",");

    //console.log(springs, ns);
    const unk = [...springs].filter((n) => n === "?").length;

    for (let j = 0; j < 2 ** unk; j++) {
        let test = springs;
        for (let k = 0; k < unk; k++) {
            test = test.replace("?", (j >> k) & 1 ? "#" : ".");
        }
        if (arrEq(check(test), ns)) {
            //console.log(test, check(test), ns);
            r++;
        }
    }
}

console.log(r);
console.log("------");
