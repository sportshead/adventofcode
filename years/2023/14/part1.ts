import input from "./input.txt";
import { transpose } from "@utils";

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);
const transp = transpose(grid);

let r = 0;
for (let i = 1; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "O") {
            for (let k = 0; k < i; k++) {
                if (grid[k][j] === ".") {
                    const t = transp[j].slice(k, i);
                    if (!t.includes("#")) {
                        grid[i][j] = ".";
                        grid[k][j] = "O";

                        transp[j][i] = ".";
                        transp[j][k] = "O";

                        break;
                    }
                }
            }
        }
    }
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === "O") {
            r += grid.length - i;
            console.log(r);
        }
    }
}
console.log(grid.map((l) => l.join("")).join("\n"));
console.log(r);
console.log("------");
