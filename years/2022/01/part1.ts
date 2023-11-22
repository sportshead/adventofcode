import input from "./input.txt";

const lines = input.split("\n");

let most = -1;
let acc = 0;
for (const line of lines) {
    const l = line.trim();
    if (l === "") {
        if (acc > most) {
            most = acc;
        }
        acc = 0;
    }

    acc += +l;
    console.log(l, acc);
}
console.log(most);
