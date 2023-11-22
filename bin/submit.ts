#!/usr/bin/env bun

import { cookieHeader, getDayFromCwd, getYearFromCwd } from "@utils";

const year = getYearFromCwd();
const day = getDayFromCwd();

console.log("year:", year, "day:", day);

if (isNaN(year) || isNaN(day)) {
    console.log("cwd:", process.cwd());
    throw "invalid year or day";
}

const level = process.argv[2];
const answer = process.argv[3];
console.log("level:", level, "answer:", answer);
if (!level || !answer) {
    console.log("argv:", process.argv);
    throw "invalid level or answer";
}

const params = new URLSearchParams();
params.set("level", level);
params.set("answer", answer);

console.log(`POST https://adventofcode.com/${year}/day/${day}/answer
${params.toString()}`);

const elementHandler: HTMLRewriterTypes.HTMLRewriterElementContentHandlers & {
    collectedText: string;
} = {
    collectedText: "",

    text(text: HTMLRewriterTypes.Text) {
        this.collectedText += text.text;
    },
};

await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
    headers: {
        ...cookieHeader.headers,
        // adventofcode doesn't work with `application/x-www-form-urlencoded;charset=UTF-8`
        "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: params,
})
    .then((res) =>
        new HTMLRewriter().on("main > article", elementHandler).transform(res),
    )
    .then((res) => elementHandler.collectedText || res.text())
    .then((txt) => console.log(txt));
