from z3 import *


def solve(buttons, target):
    ctx = Context()
    s = Solver(ctx=ctx)
    buttons_coeff = [Int(f"b{i}", ctx=ctx) for i in range(len(buttons))]

    for x in buttons_coeff:
        s.add(x >= 0)

    counters = [[] for _ in target]

    for i, bs in enumerate(buttons):
        for b in bs:
            counters[b].append(buttons_coeff[i])

    s.add([Sum(c) == t for (c, t) in zip(counters, target)])

    assert s.check() == sat

    while s.check() == sat:
        m = s.model()
        ans = [m[b].as_long() for b in buttons_coeff]

        s.add(Sum(buttons_coeff) < sum(ans))

    return ans


with open("input.txt") as f:
    lines = f.read().strip().split("\n")


def csv(s):
    return [int(x) for x in s[1:-1].split(",")]


res = 0
for l in lines:
    w = l.split(" ")[1:]

    buttons = [csv(s) for s in w[:-1]]
    target = csv(w[-1])

    res += sum(solve(buttons, target))

print(res)
