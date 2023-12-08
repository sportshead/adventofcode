import { cache } from "./optimisation.ts";

export const abs = <T extends number | bigint>(n: T): T =>
    <T>(typeof n === "bigint" ? (n >= 0n ? n : -n) : Math.abs(n));

export const _gcd = <T extends number | bigint>(a: T, b: T): T => {
    a = abs(a);
    b = abs(b);
    while (b) {
        let t = b;
        b = <T>(a % b);
        a = t;
    }
    return a;
};
export const gcd = cache(_gcd);
export const _lcm = <T extends number | bigint>(a: T, b: T): T => {
    return <T>(abs(a * b) / gcd(a, b));
};
export const lcm = cache(_lcm);
