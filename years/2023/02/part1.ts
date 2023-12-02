import input from "./input.txt";

const lines = input.split("\n");

const colours = ["red", "green", "blue"];

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    let matches = line.match(/^Game (\d+): (.+)$/);
    let splitted = matches![2].split("; ").map((show) => show.split(", "));
    let possible = true;
    for (const round of splitted) {
        const c = [0, 0, 0];
        for (const show of round) {
            const s = show.split(" ");
            const n = parseInt(s[0]);
            c[colours.indexOf(s[1])] += n;
        }
        console.log(c);
        if (c[0] > 12 || c[1] > 13 || c[2] > 14) {
            possible = false;
        }
    }
    if (possible) {
        r += parseInt(matches![1]);
        console.log(r);
    }
}

console.log(r);
console.log("------");
