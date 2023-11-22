import input from "./input.txt";

const lines = input.split("\n");

for (let i = 13; i < lines[0].length; i++) {
    const last14 = lines[0].substring(i - 14, i);
    const set = new Set([...last14]);
    if (set.size === 14) {
        throw i;
    }
}
