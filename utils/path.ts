import { cache } from "./optimisation";
import { Vector2 } from "./structs";
import { type Comparator, Heap } from "heap-js";

export interface PrioritisedObject<T extends number | bigint = number> {
    priority: T;
    toString: () => string;
}

export class PrioritisedVector2<T extends number | bigint = number>
    extends Vector2<T>
    implements PrioritisedObject<T>
{
    // client should set if bigint
    priority = 0 as T;

    toJSON(): [T, T, T] {
        return [this.x, this.y, this.priority];
    }

    static fromJSON<T extends number | bigint = number>(
        json: string,
    ): PrioritisedVector2<T> {
        const parsed = JSON.parse(json);
        const v = new PrioritisedVector2<T>(parsed[0], parsed[1]);
        v.priority = parsed[2];

        return v;
    }

    equals(other: PrioritisedVector2<T>): boolean {
        return (
            this.x === other.x &&
            this.y === other.y &&
            this.priority === other.priority
        );
    }
}

export const prioritisedObjectComparator: Comparator<PrioritisedObject> = (
    a,
    b,
) => a.priority - b.priority;

export interface PathContextBase<T extends PrioritisedObject> {
    start: T;
    goal: T;
    fromString: (str: string) => T;
}
export interface PathContext<T extends PrioritisedObject>
    extends PathContextBase<T> {
    getCost: (ctx: Required<PathContext<T>>, current: T) => number;
    getNeighbors: (ctx: Required<PathContext<T>>, current: T) => T[];
    isEqual: (ctx: Required<PathContext<T>>, a: T, b: T) => boolean;
    isGoal: (ctx: Required<PathContext<T>>, current: T) => boolean;
}

export const vector2PathContext: Partial<PathContext<PrioritisedVector2>> = {
    start: (() => {
        const v = new Vector2(0, 0) as PrioritisedVector2;
        v.priority = 0;
        return v;
    })(),
    goal: (() => {
        const v = new Vector2(0, 0) as PrioritisedVector2;
        v.priority = 0;
        return v;
    })(),
    isEqual: (ctx, a, b) => a.equals(b),
    isGoal: (ctx, current) => current.equals(ctx.goal),
    fromString: (str) => PrioritisedVector2.fromJSON(str),
};

export interface ReconstructablePathContextBase<T extends PrioritisedObject>
    extends PathContextBase<T> {
    from?: Map<string, string>;
}

export type ReconstructablePathContext<T extends PrioritisedObject> = Required<
    ReconstructablePathContextBase<T>
>;

export function reconstructPath<T extends PrioritisedObject>(
    ctx: ReconstructablePathContext<T>,
    current: T,
): T[] {
    const totalPath = [current];
    let cur = current;
    while (ctx.from.has(cur.toString())) {
        cur = ctx.fromString(ctx.from.get(cur.toString())!);
        totalPath.unshift(cur);
    }
    return totalPath;
}

export interface AStarContextInit<T extends PrioritisedObject>
    extends ReconstructablePathContextBase<T>,
        PathContextBase<T> {
    getCost: (ctx: AStarContext<T>, current: T) => number;
    getNeighbors: (ctx: AStarContext<T>, current: T) => T[];
    isEqual: (ctx: AStarContext<T>, a: T, b: T) => boolean;
    isGoal: (ctx: AStarContext<T>, current: T) => boolean;
    h: (ctx: AStarContext<T>, current: T) => number;
    queue?: Heap<T>;
    cost?: Map<string, number>;
}

export type AStarContext<T extends PrioritisedObject> = Required<
    AStarContextInit<T>
>;

// sqrt (expensive)
export const distanceHeuristic: AStarContext<PrioritisedVector2>["h"] = cache(
    (ctx, current) => current.distance(ctx.goal),
);

// uncached because arithmetic is quicker than JSON.stringify and hash lookup
export const manhattanDistanceHeuristic: AStarContext<PrioritisedVector2>["h"] =
    (ctx, current) => current.manhattanDistance(ctx.goal);

export function aStarSearch<T extends PrioritisedObject>(
    ctxInit: AStarContextInit<T>,
): T[] {
    const ctx: AStarContext<T> = {
        queue: (() => {
            const heap = new Heap<T>(prioritisedObjectComparator);
            heap.init([ctxInit.start]);
            return heap;
        })(),
        from: new Map(),
        cost: new Map([[ctxInit.start.toString(), 0]]),

        ...ctxInit,
    };

    for (const curV of ctx.queue) {
        const current = curV.toString();

        if (
            ctx.h(ctx, curV) + ctx.cost.get(current)! !== curV.priority &&
            !ctx.isEqual(ctx, curV, ctx.start)
        ) {
            // console.log(`skip ${current}, ${curV.priority}`);
            continue;
        }

        // console.log(`${current}, ${curV.priority}`);
        if (ctx.isGoal(ctx, curV)) {
            return reconstructPath(ctx, curV);
        }

        const neighbors = ctx.getNeighbors(ctx, curV);

        for (const n of neighbors) {
            const newCost = ctx.cost.get(current)! + ctx.getCost(ctx, n);
            if (
                newCost <
                (ctx.cost.get(n.toString()) ?? Number.POSITIVE_INFINITY)
            ) {
                ctx.from.set(n.toString(), current);
                ctx.cost.set(n.toString(), newCost);

                n.priority = newCost + ctx.h(ctx, n);
                ctx.queue.push(n);
                // console.log(`push ${n.toString()}, ${n.priority}`);
            }
        }
    }

    return [];
}

export type DijkstraContextInit<T extends PrioritisedObject> = Omit<
    AStarContextInit<T>,
    "h"
>;

export function dijkstraSearch<T extends PrioritisedObject>(
    ctxInit: DijkstraContextInit<T>,
): T[] {
    return aStarSearch({
        h: () => 0,
        ...ctxInit,
    });
}
