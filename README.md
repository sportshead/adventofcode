# adventofcode
Scripts and solutions for [Advent of Code](https://adventofcode.com/).

## usage
Login to AoC on your browser. Add your AoC cookie in the form of `session=abcdefg` in `cookie.txt`.
Workflow:
```bash
# source the script, adds ./bin to your path
. path.sh 
today [year] [day] # defaults to current (adjusted for AoC timezone)
# opens browser tab, idea tab
# paste test input into input.txt
# when satisfied:
swap # swaps input.txt and _input.txt files
input # get input from AoC
submit 1 <answer>
part2 # automatically swaps back inputs, copies part1.ts to part2.ts, starts new watcher
swap
submit 2 <answer>
```
