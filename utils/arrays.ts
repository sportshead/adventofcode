import { get } from "http";

export const rangedArray = (max: number, min = 0): number[] =>
    new Array(max - min).fill(0).map((_, i) => min + i);

export const sumReducer = <T, A = T>(acc: A, cur: T): A => <any>acc + cur;

export const productReducer = <T, A = T>(acc: A, cur: T): A =>
    <A>(<any>acc * <any>cur);

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
