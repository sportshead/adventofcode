import type { Vector2 } from "./structs";

/**
 * Shoelace theorem
 * @param edges Set of Vector2s, clockwise.
 */
export const shoelace = (vectors: Vector2[]): number => {
    let r = 0;
    let x1 = vectors[0].x;
    let y1 = vectors[0].y;

    for (let i = 1; i < vectors.length; i++) {
        let x2 = vectors[i].x;
        let y2 = vectors[i].y;

        r += x1 * y2 - y1 * x2;

        x1 = x2;
        y1 = y2;
    }
    const x2 = vectors[0].x;
    const y2 = vectors[0].y;
    r += x1 * y2 - y1 * x2;

    return Math.abs(r) / 2;
};
