import input from "./input.txt";
import { sortAscending, sortDescending, sumReducer } from "@utils";

const lines = input.split("\n");

let most = [-1, -1, -1];
let acc = 0;
for (const line of lines) {
    const l = line.trim();
    if (l === "") {
        for (let i = 0; i < most.length; i++) {
            if (acc > most[i]) {
                most[i] = acc;
                break;
            }
        }
        most = most.sort(sortAscending);
        console.log(most);
        acc = 0;
    }

    acc += +l;
    console.log(l, acc);
}
console.log(most);
console.log(most.reduce(sumReducer));
