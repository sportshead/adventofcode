import input from "./input.txt";
import { findHighestReducer } from "@utils";

const lines = input.split("\n");

const grid: number[][] = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    grid.push([...line].map((c) => parseInt(c)));
}

const scenicScores: number[][] = grid.map((row) =>
    new Array(row.length).fill(0),
);
console.log(scenicScores);

for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
        const tree = grid[i][j];
        let finalScore = 1;
        let score = 0;
        for (let x = 0; x < j; x++) {
            if (grid[i][x] >= tree) {
                score = 0;
            }
            score++;
        }
        finalScore *= score;
        score = 0;

        for (let x = grid[i].length - 1; x > j; x--) {
            if (grid[i][x] >= tree) {
                score = 0;
            }
            score++;
        }
        finalScore *= score;
        score = 0;

        for (let x = 0; x < i; x++) {
            if (grid[x][j] >= tree) {
                score = 0;
            }
            score++;
        }
        finalScore *= score;
        score = 0;

        for (let x = grid.length - 1; x > i; x--) {
            if (grid[x][j] >= tree) {
                score = 0;
            }
            score++;
        }
        finalScore *= score;
        score = 0;

        scenicScores[i][j] = finalScore;
    }
}

console.log(
    scenicScores,
    scenicScores
        .map((row) => row.reduce(findHighestReducer))
        .reduce(findHighestReducer),
);
