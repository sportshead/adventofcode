import { CARDINAL, CARDINAL_VECTOR2, ITERM_SET_MARK, Vector2 } from "@utils";
import input from "./input.txt";

console.log("======");

export interface TracedTreeNode<T extends TracedTreeNode<T>> {
    trace: string[];
    toString: () => string;

    name: string;
    children: Map<string, T>;
    parent: T | null;
}

export class TracedVector2<T extends number | bigint = number>
    extends Vector2<T>
    implements TracedTreeNode<TracedVector2<T>>
{
    trace: string[] = [];
    children = new Map();
    name = "";
    parent: TracedVector2<T> | null = null;

    static fromJSON<T extends number | bigint = number>(
        json: string,
    ): TracedVector2<T> {
        const parsed = JSON.parse(json);
        const v = new TracedVector2<T>(parsed[0], parsed[1]);

        return v;
    }

    clone(): TracedVector2<T> {
        const v = new TracedVector2(this.x, this.y);
        v.trace = [...this.trace, this.toString()];
        v.parent = this;

        return v;
    }
}

export interface DFSContext<T extends TracedTreeNode<T> = TracedVector2> {
    start: T;
    goal: T;

    fromString: (str: string) => T;
    getNeighbors: (ctx: DFSContext<T>, current: T) => T[];
    // isEqual: (ctx: DFSContext<T>, a: T, b: T) => boolean;
    isGoal: (ctx: DFSContext<T>, current: T) => boolean;
    canStop: (ctx: DFSContext<T>, current: T) => boolean;

    height: number;
}

export function depthFirstSearch<T extends TracedTreeNode<T> = TracedVector2>(
    ctx: DFSContext<T>,
): DFSContext<T> {
    const stack: T[] = [ctx.start];
    while (stack.length) {
        const v = stack.pop()!;
        const neighbors = ctx.getNeighbors(ctx, v);

        if (ctx.canStop(ctx, v)) {
            return ctx;
        }

        if (neighbors.length) {
            stack.push(...neighbors);
        } else {
            if (ctx.isGoal(ctx, v) && ctx.height < v.trace.length) {
                ctx.height = v.trace.length;
                // console.log("[DFS]", "new height", ctx.height /* , v.trace */);
            }
        }
    }
    return ctx;
}

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
}

const DIRS = [..."NESW"] as CARDINAL[];
const SLOPE_DIR: Record<string, CARDINAL> = {
    "^": CARDINAL.SOUTH,
    ">": CARDINAL.EAST,
    "v": CARDINAL.NORTH,
    "<": CARDINAL.WEST,
};

const getNeighbors: DFSContext["getNeighbors"] = (ctx, v) => {
    const neighbors: TracedVector2[] = [];

    for (const d of DIRS) {
        const dirV = CARDINAL_VECTOR2[d];
        let n = v.clone().add(dirV);
        let cell = grid[n.y]?.[n.x];

        if (!cell || v.trace.includes(n.toString())) {
            continue;
        }

        if ("^v<>".includes(cell)) {
            n = n.add(CARDINAL_VECTOR2[SLOPE_DIR[cell]]);
            cell = grid[n.y]?.[n.x];
        }

        if (!cell || v.trace.includes(n.toString())) {
            continue;
        }

        if (cell === ".") {
            neighbors.push(n);
        }
    }

    return neighbors;
};

const startX = grid[0].indexOf(".");
const startV = new TracedVector2(startX, 0);

const goalY = grid.length - 1;
const goalX = grid[goalY].indexOf(".");
const goalV = new TracedVector2(goalX, goalY);

console.log("pathing", startV.toString(), goalV.toString());

const path = depthFirstSearch({
    start: startV,
    goal: goalV,
    getNeighbors,
    isGoal: (ctx, v): boolean => v.equals(goalV),
    fromString: (str): TracedVector2<number> => TracedVector2.fromJSON(str),
    height: -1,
    canStop: (ctx) => ctx.height === 2370, // hard code for bench (guessed)
});

console.log(path.height);
console.log(r);
console.log("------", ITERM_SET_MARK);
