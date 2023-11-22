import input from "./input.txt";

const lines = input.split("\n");

let overlaps = 0;
for (const line of lines) {
    if (line === "") break;
    const [a, b] = line
        .split(",")
        .map((elf) => elf.split("-").map((n) => parseInt(n)));
    if (a[0] <= b[0] && a[1] >= b[1]) {
        overlaps++;
    } else if (b[0] <= a[0] && b[1] >= a[1]) {
        overlaps++;
    }
}

console.log(overlaps);
