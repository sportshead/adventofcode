export const cache = <T extends any[], U>(
    fn: (...args: T) => U,
    // for debug
    passThrough = false,
): ((...args: T) => U) & { _cache: Map<string, U> } => {
    const _cache = new Map<string, U>();
    let newFn: ((...args: T) => U) & { _cache?: Map<string, U> } = (
        ...args: T
    ): U => {
        const key = JSON.stringify(args);
        if (_cache.has(key)) {
            return _cache.get(key)!;
        } else {
            const result = fn(...args);
            _cache.set(key, result);
            return result;
        }
    };
    if (passThrough) {
        newFn = (...args: T): U => fn(...args);
    }
    newFn._cache = _cache;
    return newFn as ((...args: T) => U) & { _cache: Map<string, U> };
};

/**
 * Same as {@linkcode cache}, but JSON stringifies result for storage.
 */
export const cacheJSON = <T extends any[], U>(
    fn: (...args: T) => U,
    // for debug
    passThrough = false,
): ((...args: T) => U) & { _cache: Map<string, string> } => {
    const _cache = new Map<string, string>();
    let newFn: ((...args: T) => U) & { _cache?: Map<string, string> } = (
        ...args: T
    ): U => {
        const key = JSON.stringify(args);
        if (_cache.has(key)) {
            return JSON.parse(_cache.get(key)!);
        } else {
            const result = fn(...args);
            _cache.set(key, JSON.stringify(result));
            return result;
        }
    };
    if (passThrough) {
        newFn = (...args: T): U => fn(...args);
    }
    newFn._cache = _cache;
    return newFn as ((...args: T) => U) & { _cache: Map<string, string> };
};
