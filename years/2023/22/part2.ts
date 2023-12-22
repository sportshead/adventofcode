import { ITERM_SET_MARK, Vector3, parseIntMap } from "@utils";
import input from "./input.txt";
import { collide3D } from "../../../utils/3d";

console.log("======");

const lines = input.trim().split("\n");
type Brick = [Vector3, Vector3];

let bricks: Brick[] = [];

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [corner1, corner2] = line.split("~");
    const [x1, y1, z1] = corner1.split(",").map(parseIntMap);
    const [x2, y2, z2] = corner2.split(",").map(parseIntMap);
    const v1 = new Vector3(x1, y1, z1);
    const v2 = new Vector3(x2, y2, z2);

    const brick: Brick = [v1, v2];
    bricks.push(brick);

    // console.log(JSON.stringify(brick));
}

const update = (bricks: Brick[]): [Brick[], number] => {
    // deep copy
    const newBricks = bricks.map((b) => b.map((c) => c.clone()) as Brick);
    let fallen = 0;

    for (let i = 0; i < newBricks.length; i++) {
        const newBrick = newBricks[i];
        const oldZ0 = newBrick[0].z;
        while (
            Math.min(newBrick[0].z, newBrick[1].z) > 0 &&
            newBricks.slice(0, i).every((brick) => !collide3D(brick, newBrick))
        ) {
            newBrick[0].z--;
            newBrick[1].z--;
        }
        newBrick[0].z++;
        newBrick[1].z++;
        if (newBrick[0].z !== oldZ0) {
            fallen++;
        }
        newBricks[i] = newBrick;
    }

    return [
        newBricks.toSorted(
            ([a1, a2], [b1, b2]) => Math.min(a1.z, a2.z) - Math.min(b1.z, b2.z),
        ),
        fallen,
    ];
};

bricks = bricks.toSorted(
    ([a1, a2], [b1, b2]) => Math.min(a1.z, a2.z) - Math.min(b1.z, b2.z),
);

// console.log(JSON.stringify(bricks));
let fallen = -1;
while (fallen !== 0) {
    [bricks, fallen] = update(bricks);
}
// console.log(JSON.stringify(bricks));

for (let i = 0; i < bricks.length; i++) {
    const sliced = [...bricks.slice(0, i), ...bricks.slice(i + 1)];
    // const preUpdate = JSON.stringify(sliced);
    const [newBricks, fallen] = update(sliced);
    r += fallen;
    if (i % 20 === 0) {
        console.log(i);
    }
    // const postUpdate = JSON.stringify(newBricks);
    // if (preUpdate !== postUpdate) {
    //     console.log("disintegrated", i /* , preUpdate, postUpdate */);
    //     for (const [a, b] of sliced) {
    //         const newBrick = newBricks.find(
    //             ([j, k]) =>
    //                 a.x === j.x &&
    //                 a.y === j.y &&
    //                 b.x === k.x &&
    //                 b.y === k.y &&
    //                 a.z - j.z === b.z - k.z &&
    //                 a.z !== j.z,
    //         );
    //         if (newBrick) {
    //             // console.log(
    //             //     "chained",
    //             //     i,
    //             //     JSON.stringify([a, b]),
    //             //     JSON.stringify(newBrick),
    //             // );
    //             r++;
    //         }
    //     }
    // }
}

console.log(r);
console.log("------", ITERM_SET_MARK);
