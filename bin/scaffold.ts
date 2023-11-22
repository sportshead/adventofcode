#!/usr/bin/env bun
import { mkdir } from "node:fs/promises";
import { resolve } from "path";
import { projectRoot, rangedArray } from "@utils";

const templateFile = Bun.file(resolve(projectRoot, "template.ts"));

const year = process.argv[2] || new Date().getFullYear();
console.log(`Scaffolding years/${year}...`);

const writtenPaths: string[] = [];
await Promise.all(
    rangedArray(32, 1).map(async (day) => {
        const dir = resolve(
            projectRoot,
            `years/${year}/${day.toString().padStart(2, "0")}`,
        );
        await mkdir(dir, { recursive: true });
        const path = resolve(dir, "part1.ts");
        await Bun.write(path, templateFile);
        await Bun.write(resolve(dir, "input.txt"), "");
        writtenPaths.push(path);
    }),
);

console.log("written to:");
console.log(writtenPaths.sort().join("\n"));
