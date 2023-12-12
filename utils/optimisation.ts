export const cache = <T extends any[], U>(
    fn: (...args: T) => U,
    // for debug
    passThrough = false,
): ((...args: T) => U) & { _cache: Map<string, U> } => {
    const cache = new Map<string, U>();
    let newFn: ((...args: T) => U) & { _cache?: Map<string, U> } = (
        ...args: T
    ): U => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        } else {
            const result = fn(...args);
            cache.set(key, result);
            return result;
        }
    };
    if (passThrough) {
        newFn = (...args: T): U => fn(...args);
    }
    newFn._cache = cache;
    return newFn as ((...args: T) => U) & { _cache: Map<string, U> };
};
