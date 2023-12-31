import { gcd, lcm } from "./maths.ts";

export const rangedArray = (max: number, min = 0): number[] =>
    new Array(max - min).fill(0).map((_, i) => min + i);

export const sumReducer = <T, A = T>(acc: A, cur: T): A => <any>acc + cur;

export const productReducer = <T, A = T>(acc: A, cur: T): A =>
    <A>(<any>acc * <any>cur);

export const lcmReducer = <T extends number | bigint>(acc: T, cur: T): T =>
    lcm(acc, cur);

// not sure if this works
export const gcdReducer = <T extends number | bigint>(acc: T, cur: T): T =>
    gcd(acc, cur);

export const sortAscending = <T extends number | bigint>(a: T, b: T): T =>
    <T>(a - b);

export const sortDescending = <T extends number | bigint>(a: T, b: T): T =>
    <T>(b - a);

export const findHighestReducer = <T>(acc: T, cur: T): T =>
    cur > acc ? cur : acc;

export type expandFiller<T> = T | (() => T);
export const expandArray = <T>(
    arr: T[],
    maxLen: number,
    filler: expandFiller<T>,
): T[] => {
    let getFiller: () => T;
    if (typeof filler === "function") {
        getFiller = filler as () => T;
    } else {
        getFiller = () => filler;
    }
    while (arr.length < maxLen) {
        arr.push(getFiller());
    }
    return arr;
};

export const expandArray2D = <T>(
    arr: T[][],
    maxLen: number,
    filler: expandFiller<T>,
): T[][] => {
    return arr.map((row) => expandArray(row, maxLen, filler));
};

export const parseIntMap = (str: string) => parseInt(str);

export const transpose = <T>(array: T[][]): T[][] =>
    array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
