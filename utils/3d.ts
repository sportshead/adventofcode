import { Vector3 } from "./structs";

export const collide3D = (
    [a1, a2]: [Vector3, Vector3],
    [b1, b2]: [Vector3, Vector3],
): boolean => {
    if (!collide1D(a1.x, a2.x, b1.x, b2.x)) {
        return false;
    }

    if (!collide1D(a1.y, a2.y, b1.y, b2.y)) {
        return false;
    }

    if (!collide1D(a1.z, a2.z, b1.z, b2.z)) {
        return false;
    }

    return true;
};

// [   A  [       ]   B   ]
// ^minA  ^minB   ^maxA   ^maxB
// [   B  [       ]   A   ]
// ^minB  ^minA   ^maxB   ^maxA
export const collide1D = (
    a1: number,
    a2: number,
    b1: number,
    b2: number,
): boolean =>
    Math.max(a1, a2) >= Math.min(b1, b2) &&
    Math.min(a1, a2) <= Math.max(b1, b2);
