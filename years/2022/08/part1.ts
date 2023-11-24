import input from "./input.txt";

const lines = input.split("\n");

const grid: number[][] = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    grid.push([...line].map((c) => parseInt(c)));
}

// edges - corner overlap
let visible = grid.length * 2 + grid[0].length * 2 - 4;
let visibleTrees = new Set();
for (let i = 1; i < grid.length - 1; i++) {
    const row = grid[i];
    let largest = row[0];
    for (let j = 1; j < row.length - 1; j++) {
        if (row[j] > largest) {
            largest = row[j];
            visibleTrees.add(`${i},${j}`);
        }
    }

    largest = row[row.length - 1];
    for (let j = row.length - 1; j > 0; j--) {
        if (row[j] > largest) {
            largest = row[j];
            visibleTrees.add(`${i},${j}`);
        }
    }
}
for (let j = 1; j < grid[0].length - 1; j++) {
    let largest = grid[0][j];
    for (let i = 1; i < grid.length - 1; i++) {
        if (grid[i][j] > largest) {
            largest = grid[i][j];
            visibleTrees.add(`${i},${j}`);
        }
    }

    largest = grid[grid.length - 1][j];
    for (let i = grid.length - 1; i > 0; i--) {
        if (grid[i][j] > largest) {
            largest = grid[i][j];
            visibleTrees.add(`${i},${j}`);
        }
    }
}
visible += visibleTrees.size;
console.log(visibleTrees, visible);
