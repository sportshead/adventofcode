import input from "./input.txt";

const lines = input.split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const [l, w, h] = line.split("x").map((n) => parseInt(n));

    const side1 = 2 * (l + w + h - Math.max(l, w, h));
    const vol = h * l * w;
    sum += side1 + vol;
    console.log(sum, side1, vol);
}
console.log(sum);
console.log("------");
