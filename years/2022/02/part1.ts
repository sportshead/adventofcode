import input from "./input.txt";

const lines = input.split("\n");

const SHAPES = ["A", "B", "C"];
const RESPONSES = ["X", "Y", "Z"];
const SHAPE_SCORES = [1, 2, 3];

const MOVES = ["r", "p", "s"];
const WINS = ["s", "r", "p"];

let score = 0;
for (const line of lines) {
    if (line === "") break;
    const splitted = line.split(" ");
    const shape = MOVES[SHAPES.indexOf(splitted[0])];
    const responseIndex = RESPONSES.indexOf(splitted[1]);
    const response = MOVES[responseIndex];

    score += SHAPE_SCORES[responseIndex];

    if (shape === response) {
        score += 3;
    } else if (WINS[responseIndex] === shape) {
        score += 6;
    }
    console.log(splitted, shape, responseIndex, response);
}
console.log(score);
