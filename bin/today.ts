#!/usr/bin/env bun
import { resolve } from "path";
import { getAOCDay, getAOCYear, projectRoot } from "@utils";

console.log(
    resolve(
        projectRoot,
        `years/${process.argv[2] || getAOCYear()}/${(
            process.argv[3] || getAOCDay().toString()
        ).padStart(2, "0")}`,
    ),
);
