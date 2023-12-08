export const cache = (fn: (...args: any[]) => any) => {
    const cache = new Map();
    return (...args: any[]) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            const result = fn(...args);
            cache.set(key, result);
            return result;
        }
    };
};
