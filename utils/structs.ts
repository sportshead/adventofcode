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
