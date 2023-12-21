import { ITERM_SET_MARK, lcmReducer, parseIntMap } from "@utils";
import input from "./input.txt";

console.log("======");

const lines = input.trim().split("\n");
const grid = lines.map((l) => [...l].map(parseIntMap));

type Memory =
    | {
          t: "%";
          state: boolean;
      }
    | {
          t: "&";
          states: Map<string, Size>;
      }
    | { t: "none" };
const memory = new Map<string, Memory>();
const inputs = new Map<string, string[]>();
const targets = new Map<string, string[]>();

let r = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let [id, tg] = line.split(" -> ");
    const t = tg.split(", ");

    if (id.startsWith("%") || id.startsWith("&")) {
        id = id.slice(1);
    }

    console.log(id, t);
    for (const tt of t) {
        if (!inputs.has(tt)) {
            inputs.set(tt, []);
        }
        inputs.get(tt)!.push(id);
    }

    targets.set(id, t);
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const [id, tg] = line.split(" -> ");
    console.log(id, tg);

    if (id.startsWith("%")) {
        memory.set(id.slice(1), { t: "%", state: false });
    } else if (id.startsWith("&")) {
        const mem: Memory = { t: "&", states: new Map() };

        const inp = inputs.get(id.slice(1)) ?? [];
        for (const i of inp) {
            mem.states.set(i, "l");
        }

        memory.set(id.slice(1), mem);
    } else {
        memory.set(id, { t: "none" });
    }
}

type Size = "h" | "l";

type Pulse = {
    from: string;
    id: string;
    size: Size;
};
const pulseQueue: Pulse[] = [];

const finalKeys = ["bh", "jf", "sh", "mz"];
const finals: Record<string, number> = {};

const parsePulses = () => {
    while (pulseQueue.length) {
        const p = pulseQueue.shift()!;

        if (p.id === "mf" && p.size === "h" && finalKeys.includes(p.from)) {
            if (!finals[p.from]) {
                console.log("got", p.from, "at button", r);
                finals[p.from] = r;
            }
        }
        const m = memory.get(p.id);
        if (m?.t === "&") {
            m.states.set(p.from, p.size);
            if ([...m.states.values()].every((n) => n === "h")) {
                for (const t of targets.get(p.id)!) {
                    pulseQueue.push({
                        id: t,
                        size: "l",
                        from: p.id,
                    });
                }
            } else {
                for (const t of targets.get(p.id)!) {
                    pulseQueue.push({
                        id: t,
                        size: "h",
                        from: p.id,
                    });
                }
            }
        } else if (m?.t === "%") {
            if (p.size === "l") {
                m.state = !m.state;
                const size = m.state ? "h" : "l";
                for (const t of targets.get(p.id)!) {
                    pulseQueue.push({
                        id: t,
                        size,
                        from: p.id,
                    });
                }
            }
        } else if (m?.t === "none") {
            for (const t of targets.get(p.id)!) {
                pulseQueue.push({
                    id: t,
                    size: p.size,
                    from: p.id,
                });
            }
        }
    }
};

const FLOWCHART_START_SYMBOL = {
    "%": "[/",
    "&": "([",
    "none": "[",
};
const FLOWCHART_ID_SYMBOL = {
    "%": "%",
    "&": "&",
    "none": "",
};
const FLOWCHART_END_SYMBOL = {
    "%": "/]",
    "&": "])",
    "none": "]",
};
console.log(`
== <DIAGRAM> ==
flowchart TD
${[...memory]
    .map(
        ([id, mem]) =>
            id +
            FLOWCHART_START_SYMBOL[mem.t] +
            FLOWCHART_ID_SYMBOL[mem.t] +
            id +
            FLOWCHART_END_SYMBOL[mem.t],
    )
    .map((n) => "    " + n)
    .join("\n")}

${[...targets]
    .flatMap(([from, tos]) => tos.map((to) => `${from} --> ${to}`))
    .map((n) => "    " + n)
    .join("\n")}
== </DIAGRAM> ==`);

for (;;) {
    r++;
    pulseQueue.push({
        id: "broadcaster",
        size: "l",
        from: "button",
    });
    parsePulses();
    if (finalKeys.every((n) => !!finals[n])) {
        break;
    }
}

console.log(finalKeys.map((k) => finals[k]).reduce(lcmReducer, 1));
console.log(r);
console.log("------", ITERM_SET_MARK);
