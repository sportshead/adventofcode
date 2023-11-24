import input from "./input.txt";

const lines = input.split("\n");

let floor = 0;
let i = 0;
for (const c of [...lines[0]]) {
    i++;
    if (c === "(") {
        floor++;
    } else if (c === ")") {
        floor--;
    }
    if (floor === -1) {
        throw i;
    }
}
console.log(floor);
