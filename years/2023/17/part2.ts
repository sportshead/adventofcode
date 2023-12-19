import {
    Vector2,
    parseIntMap,
    sumReducer,
    ITERM_SET_MARK,
    AStarContextInit,
    aStarSearch,
    PrioritisedObject,
    CARDINAL_VECTOR2,
} from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l].map(parseIntMap));

let r = 0;

const DIR_LEFT: Record<string, string> = {
    "[1,0]": "[0,1]",
    "[-1,0]": "[0,-1]",
    "[0,1]": "[1,0]",
    "[0,-1]": "[-1,0]",
};

const DIR_RIGHT: Record<string, string> = {
    "[1,0]": "[0,-1]",
    "[-1,0]": "[0,1]",
    "[0,1]": "[-1,0]",
    "[0,-1]": "[1,0]",
};

class CrucibleState<T extends number | bigint = number>
    extends Vector2<T>
    implements PrioritisedObject<T>
{
    // client should set if bigint
    priority = 0 as T;
    straight = 0 as T;
    dir = <Vector2<T>>new Vector2(0, 0);

    toJSON(): T[] {
        return [this.x, this.y, this.straight, ...this.dir.toJSON()];
    }

    static fromJSON<T extends number | bigint = number>(
        json: string,
    ): CrucibleState<T> {
        const [x, y, straight, dirX, dirY] = JSON.parse(json) as ReturnType<
            CrucibleState<T>["toJSON"]
        >;
        const v = new CrucibleState<T>(x, y);
        v.straight = straight ?? 0;
        v.dir = new Vector2(dirX ?? 0, dirY ?? 0);

        return v;
    }

    equals(other: typeof this): boolean {
        return (
            super.equals(other) &&
            this.straight === other.straight &&
            this.dir === other.dir &&
            this.priority === other.priority
        );
    }

    clone(): CrucibleState<T> {
        return new CrucibleState(...this.toJSON());
    }
}

const getNeighbors: AStarContextInit<CrucibleState>["getNeighbors"] = (
    ctx,
    curV,
) => {
    const neighbors = [];

    const dir = curV.dir;

    const forward = curV.clone().add(dir);
    forward.dir = dir;

    const leftDir = Vector2.fromJSON<number>(DIR_LEFT[dir.toString()]);
    const left = curV.clone().add(leftDir);
    left.dir = leftDir;

    const rightDir = Vector2.fromJSON<number>(DIR_RIGHT[dir.toString()]);
    const right = curV.clone().add(rightDir);
    right.dir = rightDir;

    if (grid[forward.y]?.[forward.x] && curV.straight < 10) {
        forward.straight = curV.straight + 1;
        neighbors.push(forward);
    }

    if (grid[left.y]?.[left.x] && curV.straight >= 4) {
        left.straight = 1;
        neighbors.push(left);
    }

    if (grid[right.y]?.[right.x] && curV.straight >= 4) {
        right.straight = 1;
        neighbors.push(right);
    }

    return neighbors;
};
const path = aStarSearch<CrucibleState>({
    start: (() => {
        const s = new CrucibleState<number>(0, 0);
        s.priority = 0;
        s.straight = 1;
        s.dir = CARDINAL_VECTOR2.E;
        return s;
    })(),
    goal: new CrucibleState(grid[0].length - 1, grid.length - 1),
    getNeighbors,
    getCost: (_, current) => {
        return grid[current.y]?.[current.x];
    },
    //h: manhattanDistanceHeuristic,
    //h: (ctx, cur) => cur.manhattanDistance(ctx.goal) / 2,
    h: () => 0,
    isEqual: (_, a, b): boolean => a.equals(b),
    isGoal: (ctx, current): boolean =>
        current.x === ctx.goal.x &&
        current.y === ctx.goal.y &&
        current.straight >= 4,
    fromString: (str): CrucibleState<number> => CrucibleState.fromJSON(str),
});

const heats = path.map((n) => grid[n.y]?.[n.x] ?? 0).slice(1);

const DIR_CHAR: Record<string, string> = {
    "[0,1]": "v",
    "[0,-1]": "^",
    "[1,0]": ">",
    "[-1,0]": "<",
};

let last = path[0];
for (let i = 1; i < path.length; i++) {
    const cur = path[i];
    const dir = cur.clone().subtract(last);

    // @ts-expect-error
    grid[cur.y][cur.x] = DIR_CHAR[JSON.stringify([dir.x, dir.y])];

    last = cur;
}
console.log(grid.map((l) => l.join("")).join("\n"));

console.log(JSON.stringify(path));
console.log(heats);
console.log(heats.reduce(sumReducer, 0));

console.log(r);
console.log("------", ITERM_SET_MARK);
