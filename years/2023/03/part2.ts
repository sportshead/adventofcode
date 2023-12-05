import input from "./input.txt";
import { productReducer, sumReducer, SYMBOLS } from "@utils";

const lines = input.split("\n");
const grid = lines.filter((l) => !!l).map((l) => [...l]);

let r = 0;
for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
        if (row[j] === "*") {
            let gears = new Map<string, number>();
            for (
                let k = Math.max(0, i - 1);
                k < Math.min(i + 2, grid.length);
                k++
            ) {
                for (
                    let l = Math.max(0, j - 1);
                    l < Math.min(j + 2, grid.length);
                    l++
                ) {
                    let cell = parseInt(grid[k][l]);
                    if (!isNaN(cell)) {
                        console.log(cell);
                        let str = cell.toString();
                        let backtrack = l - 1;
                        while (!isNaN(parseInt(grid[k][backtrack]))) {
                            str = grid[k][backtrack] + str;
                            backtrack--;
                        }
                        const leftC = backtrack;
                        backtrack = l + 1;
                        while (!isNaN(parseInt(grid[k][backtrack]))) {
                            str += grid[k][backtrack];
                            backtrack++;
                        }
                        gears.set(`${k},${leftC}`, parseInt(str));
                        console.log(k, backtrack, str);
                    }
                }
            }
            if (gears.size === 2) {
                r += [...gears.values()].reduce(productReducer, 1);
                console.log(gears);
            }
        }
    }
}

console.log(r);
console.log("------");
