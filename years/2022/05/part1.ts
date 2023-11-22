import input from "./input.txt";

const lines = input.split("\n");

const grid: string[][] = [];
let end = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
        end = i + 1;
        break;
    }

    for (let i = 0; i < line.length / 4; i++) {
        if (!Array.isArray(grid[i])) {
            grid[i] = [];
        }
        const char = [...line][i * 4 + 1];
        if (char !== " ") {
            if ([...line][i * 4] !== "[") {
                break;
            }
            grid[i].push(char);
        }
    }
}

for (let i = end; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;
    console.log(line);

    const matches = line.match(/move (\d+) from (\d+) to (\d+)/);
    if (!matches) {
        console.error(line, matches);
        throw "no matches";
    }
    const amount = +matches[1];
    const from = +matches[2] - 1;
    const to = +matches[3] - 1;
    console.log(amount, from, to);

    for (let j = 0; j < amount; j++) {
        grid[to].unshift(grid[from].shift()!);
    }
}
console.log(grid);
console.log(grid.reduce((acc, cur) => acc + cur[0], ""));
