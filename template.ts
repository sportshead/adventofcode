import input from "./input.txt";

const lines = input.split("\n");

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
}

console.log(r);
console.log("------");
