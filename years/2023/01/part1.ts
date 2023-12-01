import input from "./input.txt";

const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    const splitted = [...line].map((n) => parseInt(n)).filter((n) => !isNaN(n));
    console.log(splitted);
    sum += splitted[0] * 10 + splitted.reverse()[0];
}

console.log(sum);
console.log("------");
