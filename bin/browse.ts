#!/usr/bin/env bun
import { getDayFromCwd, getYearFromCwd } from "@utils";

const browseURL = `https://adventofcode.com/${
    process.argv[2] || getYearFromCwd()
}/day/${process.argv[3] || getDayFromCwd()}`;
export default browseURL;

console.log(browseURL);
