import { CARDINAL, CARDINAL_VECTOR2, ITERM_SET_MARK, Vector2 } from "@utils";
import input from "./input.txt";

export interface TracedTreeNode<T extends TracedTreeNode<T>> {
    trace: string[];
    toString: () => string;

    name: string;
    cost: number;
}

export class TracedVector2<T extends number | bigint = number>
    extends Vector2<T>
    implements TracedTreeNode<TracedVector2<T>>
{
    trace: string[] = [];
    name = "";
    cost = 0;

    static fromJSON<T extends number | bigint = number>(
        json: string,
    ): TracedVector2<T> {
        const parsed = JSON.parse(json);
        const v = new TracedVector2<T>(parsed[0], parsed[1]);

        return v;
    }

    clone(): TracedVector2<T> {
        const v = new TracedVector2(this.x, this.y);
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
            if (ctx.isGoal(ctx, v) && ctx.height < v.cost) {
                ctx.height = v.cost;
                console.log("[DFS]", "new height", ctx.height /* v.trace */);
            }
        }
    }
    return ctx;
}

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l]);

let r = 0;

const DIRS = [..."NESW"] as CARDINAL[];

const getNeighbors = (v: TracedVector2) => {
    const neighbors: TracedVector2[] = [];

    for (const d of DIRS) {
        const dirV = CARDINAL_VECTOR2[d];
        let n = v.clone().add(dirV);
        let cell = grid[n.y]?.[n.x];

        if (!cell || v.trace.includes(n.toString())) {
            continue;
        }

        if ("^v<>.".includes(cell)) {
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

const neighbors = new Map<string, string[]>();
const walkQueue: TracedVector2[] = [startV];
while (walkQueue.length) {
    const v = walkQueue.shift()!;
    const ns = getNeighbors(v);
    const nsarr: string[] = [];
    for (const n of ns) {
        const d = n.clone().subtract(v);
        const newV = v.clone().add(d);
        let cell = grid[newV.y]?.[newV.x];
        while ("^v<>.".includes(cell)) {
            // fix joints in the middle of the path
            // e.g.
            // #O########
            // #OOOO....#
            // ####O#####
            if (getNeighbors(newV).length > 2) {
                newV.add(d);
                break;
            }
            newV.add(d);
            cell = grid[newV.y]?.[newV.x];
        }
        newV.subtract(d);
        cell = grid[newV.y]?.[newV.x];
        if ("^v<>.".includes(cell)) {
            nsarr.push(newV.toString());
            if (!neighbors.has(newV.toString())) {
                walkQueue.push(newV);
            }
        }
    }
    neighbors.set(v.toString(), nsarr);
}

const simplified = new Map<string, string[]>();
// key: [from, to]
const costs = new Map<string, number>();
const skip = new Set<string>();
const unskip = new Set<String>();

const simplifyQueue = [...neighbors.entries()];

for (const [v, ns] of simplifyQueue) {
    if (!unskip.has(v) && (skip.has(v) || simplified.has(v))) {
        continue;
    }
    skip.add(v);
    let newNs = ns.filter((n) => !simplified.has(n) && !skip.has(n));
    let cost = 0;
    let last = v;
    console.log(newNs);
    while (newNs.length === 1) {
        cost += Vector2.fromJSON<number>(v).manhattanDistance(
            Vector2.fromJSON(newNs[0]),
        );
        last = newNs[0];
        skip.add(newNs[0]);
        newNs = neighbors
            .get(newNs[0])!
            .filter((n) => !simplified.has(n) && !skip.has(n));
    }
    simplified.set(v, newNs);
    for (const n of newNs) {
        console.log(n);
        skip.delete(n);
        simplifyQueue.push([n, neighbors.get(n)!]);
        const newCost =
            cost +
            Vector2.fromJSON<number>(last).manhattanDistance(
                Vector2.fromJSON(n),
            );
        costs.set(JSON.stringify([v, n]), newCost);
        costs.set(JSON.stringify([n, v]), newCost);
    }
}

console.log(skip, simplified);

console.log("pathing", startV.toString(), goalV.toString());

const path = depthFirstSearch({
    start: startV,
    goal: goalV,
    getNeighbors: (ctx, v) =>
        simplified
            .get(v.toString())!
            .filter((n) => !v.trace.includes(n))
            .map((n) => TracedVector2.fromJSON(n))
            .map((n) => {
                n.cost =
                    v.cost +
                    costs.get(JSON.stringify([v.toString(), n.toString()]))!;
                n.trace = [...v.trace, v.toString()];
                return n;
            }),
    isGoal: (ctx, v): boolean => v.equals(goalV),
    canStop: () => false,
    fromString: (str): TracedVector2<number> => TracedVector2.fromJSON(str),
    height: -1,
});

console.log(path.height);
console.log(r);
console.log("------", ITERM_SET_MARK);
