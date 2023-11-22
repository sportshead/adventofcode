#!/usr/bin/env bun
import { getDayFromCwd, getYearFromCwd } from "@utils";

console.log(
    `https://adventofcode.com/${process.argv[2] || getYearFromCwd()}/day/${
        process.argv[3] || getDayFromCwd()
    }`,
);
