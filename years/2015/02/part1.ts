import input from "./input.txt";

const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const [l, w, h] = line.split("x").map((n) => parseInt(n));

    const side1 = 2 * l * w;
    const side2 = 2 * w * h;
    const side3 = 2 * h * l;
    const smallest = Math.min(side1, side2, side3) / 2;
    sum += side1 + side2 + side3 + smallest;
    console.log(sum, side1, side2, side3, smallest);
}
console.log(sum);
console.log("------");
