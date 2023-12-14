import input from "./input.txt";
import { transpose } from "@utils";

const lines = input.trim().split("\n");
let grid = lines.map((l) => [...l]);

const getRocks = (part: string): string => {
    const amt = [...part].filter((n) => n === "O").length;
    const newStr = "O".repeat(amt);

    return newStr + ".".repeat(part.length - newStr.length);
};

const roll = (arr: string[]): string[] => {
    const parts = arr.join("").split("#");

    const newParts = [];
    for (const part of parts) {
        const newStr = getRocks(part);
        newParts.push(newStr);
    }

    return [...newParts.join("#")];
};

const revRoll = (arr: string[]): string[] => roll(arr.reverse()).reverse();

const cycle = (grid: string[][]): string[][] => {
    let transp = transpose(grid);
    for (let i = 0; i < transp.length; i++) {
        transp[i] = roll(transp[i]);
        grid = transpose(transp);
    }

    for (let i = 0; i < grid.length; i++) {
        grid[i] = roll(grid[i]);
        transp = transpose(grid);
    }

    for (let i = 0; i < transp.length; i++) {
        transp[i] = revRoll(transp[i]);
        grid = transpose(transp);
    }

    for (let i = 0; i < grid.length; i++) {
        grid[i] = revRoll(grid[i]);
    }
    return grid;
};

const getSum = (grid: string[][]): number => {
    let r = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === "O") {
                r += grid.length - i;
            }
        }
    }
    return r;
};

const prettyHash = (grid: string[][]): string =>
    grid.map((l) => l.join("")).join("\n");

let n = 0;
const MAX = 1e9;
const hashes: string[] = [];
let idx = -1;
while (idx === -1 && n < MAX) {
    hashes.push(prettyHash(grid));
    n++;

    grid = cycle(grid);
    idx = hashes.indexOf(prettyHash(grid));
}

const jmp = n - idx;

let rem = (MAX - idx) % jmp;
console.log(`got cycle from ${idx} to ${n}, ${rem} remaining`);
for (let i = 0; i < rem; i++) {
    grid = cycle(grid);
}
//console.log(prettyHash(grid));
console.log(getSum(grid));
console.log("------");
