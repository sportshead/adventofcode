#!/usr/bin/env bun
import {
    cookieHeader,
    getAOCDay,
    getAOCYear,
    getDayFromCwd,
    getYearFromCwd,
    secondsToHMMSS,
} from "@utils";

const USER_ID = "3227507";
const timeStarted = await Bun.file("./timestarted.txt")
    .text()
    .then((s) => s.trim())
    .then((s) => new Date(s));
const timeStartedEpoch = Math.floor(timeStarted.getTime() / 1000);
const leaderboard = await fetch(
    `https://adventofcode.com/${
        getYearFromCwd() || getAOCYear()
    }/leaderboard/private/view/${USER_ID}.json`,
    cookieHeader,
).then((res) => res.json());
const user = leaderboard.members[USER_ID];
const today =
    user.completion_day_level[(getDayFromCwd() || getAOCDay()).toString()];
console.log(
    `Started today at ${timeStarted}
${user.name} has ${user.stars} ⭐.
Score: ${user.global_score}

Adjusted: ${secondsToHMMSS(
        today["1"].get_star_ts - timeStartedEpoch,
    )}, ${secondsToHMMSS(today["2"].get_star_ts - timeStartedEpoch)}`,
);
