import input from "./input.txt";
import { NamedTreeNode } from "@utils";

const lines = input.split("\n");

const root = new NamedTreeNode<number>("/");
let cwd = root;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") break;

    const args = line.split(" ").slice(1);

    if (args[0] === "cd") {
        if (args[1] === "/") {
            cwd = root;
        } else if (args[1] === "..") {
            cwd = cwd.parent ?? root;
        } else {
            cwd = cwd.getAndCastChild(args[1]);
        }
    } else if (args[0] === "ls") {
        i++;
        while (!lines[i].startsWith("$ ") && lines[i] !== "") {
            const entry = lines[i].split(" ");
            if (entry[0] === "dir") {
                new NamedTreeNode(entry[1], cwd);
            } else {
                cwd.children.set(entry[1], +entry[0]);
            }
            i++;
        }
        i--;
    }
}
console.log(root);
let sum = 0;

function recurse(node: NamedTreeNode<number>): number {
    let size = 0;
    for (const child of node.children.values()) {
        if (typeof child === "number") {
            size += child;
        } else {
            size += recurse(child);
        }
    }
    if (size <= 100000) {
        sum += size;
    }

    return size;
}
recurse(root);

console.log(sum);
console.log("-----");
