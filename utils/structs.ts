export class TreeNode<T = {}> {
    children: (TreeNode<T> | T)[] = [];

    constructor(parent?: TreeNode<T>) {
        parent?.children?.push(this);
    }
}

export class NamedTreeNode<T = {}, K = string> {
    children: Map<K, NamedTreeNode<T, K> | T> = new Map();

    constructor(
        public name: K,
        public parent?: NamedTreeNode<T, K>,
    ) {
        parent?.children?.set(name, this);
    }

    getAndCastChild(name: K): NamedTreeNode<T, K> {
        return this.children.get(name) as NamedTreeNode<T, K>;
    }
}

export class Vector2<T extends number | bigint = number> {
    // @ts-ignore TS2564
    x: T;
    // @ts-ignore TS2564
    y: T;

    constructor(vec: Vector2<T>);
    constructor(x?: T, y?: T);
    constructor(...args: [vec: Vector2<T>] | [x: T, y: T]) {
        this.set(...args);
    }

    set(...args: [vec: Vector2<T>] | [x: T, y: T]): Vector2<T> {
        if (typeof args[0] === "number" || typeof args[0] === "bigint") {
            this.x = args[0];
            this.y = args[1]!;
        } else if (args[0] instanceof Vector2) {
            const { x, y } = args[0];
            this.x = x;
            this.y = y;
        } else {
            console.error(args);
            throw "invalid args to Point2D";
        }
        return this;
    }

    distance(this: Vector2<number>, other: Vector2<number>): number {
        const a = Math.abs(this.distanceX(other));
        const b = Math.abs(this.distanceY(other));
        return Math.sqrt(a * a + b * b);
    }

    distanceX(other: Vector2<T>): T {
        return <T>(this.x - other.x);
    }
    distanceY(other: Vector2<T>): T {
        return <T>(this.y - other.y);
    }

    add(amount: T): Vector2<T>;
    add(other: Vector2<T>): Vector2<T>;
    add(value: T | Vector2<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector2(value, value);
        }
        // @ts-ignore TS2365
        this.x += value.x;
        // @ts-ignore TS2365
        this.y += value.y;
        return this;
    }

    subtract(amount: T): Vector2<T>;
    subtract(other: Vector2<T>): Vector2<T>;
    subtract(value: T | Vector2<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector2(value, value);
        }
        // @ts-ignore TS2365
        this.x -= value.x;
        // @ts-ignore TS2365
        this.y -= value.y;
        return this;
    }

    multiply(amount: T): Vector2<T>;
    multiply(other: Vector2<T>): Vector2<T>;
    multiply(value: T | Vector2<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector2(value, value);
        }
        // @ts-ignore TS2365
        this.x *= value.x;
        // @ts-ignore TS2365
        this.y *= value.y;
        return this;
    }

    divide(this: Vector2<number>, amount: number): Vector2<number>;
    divide(this: Vector2<number>, other: Vector2<number>): Vector2<number>;
    divide(this: Vector2<number>, value: number | Vector2<number>) {
        if (typeof value === "number") {
            value = new Vector2(value, value);
        }
        this.x /= value.x;
        this.y /= value.y;
        return this;
    }

    toString() {
        return JSON.stringify(this);
    }

    toJSON(): [T, T] {
        return [this.x, this.y];
    }

    clone(): Vector2<T> {
        return new Vector2(...this.toJSON());
    }

    fromJSON(json: string): Vector2<T> {
        return this.set(...JSON.parse(json));
    }

    static fromJSON<T extends number | bigint>(json: string): Vector2<T> {
        return new Vector2<T>(0 as T, 0 as T).fromJSON(json);
    }
}

export class Vector3<T extends number | bigint = number> {
    // @ts-ignore TS2564
    x: T;
    // @ts-ignore TS2564
    y: T;
    // @ts-ignore TS2564
    z: T;

    constructor(vec: Vector3<T>);
    constructor(x?: T, y?: T, z?: T);
    constructor(...args: [vec: Vector3<T>] | [x: T, y: T, z: T]) {
        this.set(...args);
    }

    set(...args: [vec: Vector3<T>] | [x: T, y: T, z: T]): Vector3<T> {
        if (typeof args[0] === "number" || typeof args[0] === "bigint") {
            this.x = args[0];
            this.y = args[1]!;
            this.z = args[2]!;
        } else if (args[0] instanceof Vector3) {
            const { x, y, z } = args[0];
            this.x = x;
            this.y = y;
            this.z = z;
        } else {
            console.error(args);
            throw "invalid args to Vector3";
        }
        return this;
    }

    distance(this: Vector3<number>, other: Vector3<number>): number {
        const a = this.x - other.x;
        const b = this.y - other.y;
        const c = this.z - other.z;
        return Math.sqrt(a * a + b * b + c * c);
    }

    add(amount: T): Vector3<T>;
    add(other: Vector3<T>): Vector3<T>;
    add(value: T | Vector3<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector3(value, value, value);
        }
        // @ts-ignore TS2365
        this.x += value.x;
        // @ts-ignore TS2365
        this.y += value.y;
        // @ts-ignore TS2365
        this.z += value.z;
        return this;
    }

    subtract(amount: T): Vector3<T>;
    subtract(other: Vector3<T>): Vector3<T>;
    subtract(value: T | Vector3<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector3(value, value, value);
        }
        // @ts-ignore TS2365
        this.x -= value.x;
        // @ts-ignore TS2365
        this.y -= value.y;
        // @ts-ignore TS2365
        this.z -= value.z;
        return this;
    }

    multiply(amount: T): Vector3<T>;
    multiply(other: Vector3<T>): Vector3<T>;
    multiply(value: T | Vector3<T>) {
        if (typeof value === "number" || typeof value === "bigint") {
            value = new Vector3(value, value, value);
        }
        // @ts-ignore TS2365
        this.x *= value.x;
        // @ts-ignore TS2365
        this.y *= value.y;
        // @ts-ignore TS2365
        this.z *= value.z;
        return this;
    }

    divide(this: Vector3<number>, amount: number): Vector3<number>;
    divide(this: Vector3<number>, other: Vector3<number>): Vector3<number>;
    divide(this: Vector3<number>, value: number | Vector3<number>) {
        if (typeof value === "number") {
            value = new Vector3(value, value, value);
        }
        this.x /= value.x;
        this.y /= value.y;
        this.z /= value.z;
        return this;
    }

    toString() {
        return JSON.stringify(this);
    }

    toJSON(): [T, T, T] {
        return [this.x, this.y, this.z];
    }

    clone(): Vector3<T> {
        return new Vector3(...this.toJSON());
    }

    fromJSON(json: string): Vector3<T> {
        return this.set(...JSON.parse(json));
    }

    static fromJSON<T extends number | bigint>(json: string): Vector3<T> {
        return new Vector3<T>().fromJSON(json);
    }
}
