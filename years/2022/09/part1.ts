import input from "./input.txt";
import {
    CARDINAL,
    CARDINAL_VECTOR2,
    DIRECTION,
    DIRECTION_CARDINAL,
    Vector2,
} from "@utils";

const lines = input.split("\n");

const visited = new Set<string>();

const head = new Vector2<number>(0, 0);
const tail = new Vector2<number>(0, 0);

visited.add(tail.toString());
console.log(visited, head.toString(), tail.toString(), visited.size);
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const splitted = line.split(" ");
    const dir: CARDINAL = DIRECTION_CARDINAL[splitted[0] as DIRECTION];
    const vec = CARDINAL_VECTOR2[dir];
    const steps = parseInt(splitted[1]);

    if (isNaN(steps)) {
        console.error(line, splitted, steps);
        throw steps;
    }
    for (let j = 0; j < steps; j++) {
        head.add(vec);
        const distX = head.distanceX(tail);
        const distY = head.distanceY(tail);

        const tailVec: Vector2 = new Vector2(0, 0);

        if (distX === 2 && distY === 0) {
            tailVec.set(CARDINAL_VECTOR2.E);
        } else if (distX === -2 && distY === 0) {
            tailVec.set(CARDINAL_VECTOR2.W);
        } else if (distX === 0 && distY === 2) {
            tailVec.set(CARDINAL_VECTOR2.N);
        } else if (distX === 0 && distY === -2) {
            tailVec.set(CARDINAL_VECTOR2.S);
        } else if (
            (distX === 2 && distY === 1) ||
            (distX === 1 && distY === 2)
        ) {
            tailVec.set(CARDINAL_VECTOR2.NE);
        } else if (
            (distX === -2 && distY === -1) ||
            (distX === -1 && distY === -2)
        ) {
            tailVec.set(CARDINAL_VECTOR2.SW);
        } else if (
            (distX === -2 && distY === 1) ||
            (distX === -1 && distY === 2)
        ) {
            tailVec.set(CARDINAL_VECTOR2.NW);
        } else if (
            (distX === 2 && distY === -1) ||
            (distX === 1 && distY === -2)
        ) {
            tailVec.set(CARDINAL_VECTOR2.SE);
        }
        tail.add(tailVec);
        visited.add(tail.toString());
    }
    console.log(dir, steps, head.toJSON(), tail.toJSON());
}

console.log(visited, head.toJSON(), tail.toJSON(), visited.size);
console.log("------\n\n");
