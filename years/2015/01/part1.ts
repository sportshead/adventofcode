import input from "./input.txt";

const lines = input.split("\n");

let floor = 0;
for (const c of [...lines[0]]) {
    if (c === "(") {
        floor++;
    } else if (c === ")") {
        floor--;
    }
}
console.log(floor);
