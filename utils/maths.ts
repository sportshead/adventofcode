export const abs = <T extends number | bigint>(n: T): T =>
    <T>(typeof n === "bigint" ? (n >= 0n ? n : -n) : Math.abs(n));

export const gcd = <T extends number | bigint>(a: T, b: T): T => {
    a = abs(a);
    b = abs(b);
    while (b) {
        let t = b;
        b = <T>(a % b);
        a = t;
    }
    return a;
};
export const lcm = <T extends number | bigint>(a: T, b: T): T => {
    return <T>(abs(a * b) / gcd(a, b));
};
