import { ITERM_SET_MARK, parseIntMap } from "@utils";
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

let lows = 0;
let highs = 0;

const parsePulses = () => {
    while (pulseQueue.length) {
        // console.log(pulseQueue);
        const p = pulseQueue.shift()!;
        const m = memory.get(p.id);
        if (m?.t === "&") {
            m.states.set(p.from, p.size);
            if ([...m.states.values()].every((n) => n === "h")) {
                // console.log("&", "l", p.id, targets.get(p.id)!.length);
                lows += targets.get(p.id)!.length;
                for (const t of targets.get(p.id)!) {
                    pulseQueue.push({
                        id: t,
                        size: "l",
                        from: p.id,
                    });
                }
            } else {
                // console.log("&", "h", p.id, targets.get(p.id)!.length);
                highs += targets.get(p.id)!.length;
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
                // console.log("%", size, p.id, targets.get(p.id)!.length);
                if (m.state) {
                    highs += targets.get(p.id)!.length;
                } else {
                    lows += targets.get(p.id)!.length;
                }
                for (const t of targets.get(p.id)!) {
                    pulseQueue.push({
                        id: t,
                        size,
                        from: p.id,
                    });
                }
            }
        } else if (m?.t === "none") {
            // console.log("?", p.size, p.id, targets.get(p.id)!.length);
            if (p.size === "h") {
                highs += targets.get(p.id)!.length;
            } else {
                lows += targets.get(p.id)!.length;
            }
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

for (let i = 0; i < 1000; i++) {
    lows++;
    pulseQueue.push({
        id: "broadcaster",
        size: "l",
        from: "button",
    });
    parsePulses();
}

console.log(lows, highs);
console.log(lows * highs);
console.log(r);
console.log("------", ITERM_SET_MARK);
