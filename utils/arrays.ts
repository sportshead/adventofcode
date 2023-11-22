export const rangedArray = (max: number, min = 0): number[] =>
    new Array(max - min).fill(0).map((_, i) => min + i);

export const sumReducer = <T, A = T>(acc: A, cur: T): A => <any>acc + cur;

export const sortAscending = <T extends number | bigint>(a: T, b: T): T =>
    <T>(a - b);

export const sortDescending = <T extends number | bigint>(a: T, b: T): T =>
    <T>(b - a);
