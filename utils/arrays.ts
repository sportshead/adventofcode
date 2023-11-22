export const rangedArray = (max: number, min = 0): number[] =>
    new Array(max - min).fill(0).map((_, i) => min + i);
