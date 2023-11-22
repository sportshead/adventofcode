#!/usr/bin/env bun

import { cookieHeader, getDayFromCwd, getYearFromCwd } from "@utils";

const inputFile = Bun.file("input.txt");
if (inputFile.size != 0 && !process.argv.includes("-f")) {
    throw `./input.txt already exists! run "input -f" to override`;
}

const year = getYearFromCwd();
const day = getDayFromCwd();

console.log("year:", year, "day:", day);

if (isNaN(year) || isNaN(day)) {
    console.log("cwd:", process.cwd());
    throw "invalid year or day";
}
console.log(`GET https://adventofcode.com/${year}/day/${day}/input`);
await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    cookieHeader,
).then((res) => Bun.write(inputFile, res));
console.log("written to input.txt");
