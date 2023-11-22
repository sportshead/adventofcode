import input from "./input.txt";

const lines = input.split("\n");

for (let i = 3; i < lines[0].length; i++) {
    const last4 = lines[0].substring(i - 4, i);
    const set = new Set([...last4]);
    if (set.size === 4) {
        throw i;
    }
}
