import input from "./input.txt";

const lines = input.split("\n");

const SHAPES = ["A", "B", "C"];
const RESPONSES = ["X", "Y", "Z"];
const SHAPE_SCORES = [1, 2, 3];

const MOVES = ["r", "p", "s"];
const WINS = ["s", "r", "p"];
const LOSES = ["p", "s", "r"];

let score = 0;
for (const line of lines) {
    if (line === "") break;
    const splitted = line.split(" ");
    const shapeIndex = SHAPES.indexOf(splitted[0]);
    const shape = MOVES[shapeIndex];
    if (splitted[1] === "Y") {
        score += 3;
        score += SHAPE_SCORES[shapeIndex];
    } else if (splitted[1] === "Z") {
        score += 6;
        score += SHAPE_SCORES[WINS.indexOf(shape)];
    } else {
        score += SHAPE_SCORES[LOSES.indexOf(shape)];
    }
}
console.log(score);
