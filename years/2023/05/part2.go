package main

import (
	"fmt"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
)

type result struct {
	sync.Mutex
	value int
}

func main() {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	maps := strings.Split(string(input)[:len(input)-1], "\n\n")

	seedsStr := regexp.MustCompile(`seeds: ([\d ]+)`).FindStringSubmatch(maps[0])[1]
	seeds := strings.Split(seedsStr, " ")
	seedsInts := make([]int, len(seeds))
	for i, seed := range seeds {
		n, err := strconv.Atoi(seed)
		if err != nil {
			panic(err)
		}
		seedsInts[i] = n
	}
	fmt.Println(seeds)

	maps = maps[1:]
	//fmt.Println(maps)

	mapLines := make([][][]int, len(maps))
	for i, mapping := range maps {
		lines := strings.Split(mapping, "\n")[1:]
		splittedLines := make([][]int, len(lines))
		for j, line := range lines {
			splittedLine := strings.Split(line, " ")
			var lineInts []int
			//fmt.Println(splittedLine)
			for _, s := range splittedLine {
				n, err := strconv.Atoi(s)
				if err != nil {
					panic(err)
				}
				lineInts = append(lineInts, n)
			}
			splittedLines[j] = lineInts
		}
		mapLines[i] = splittedLines
	}

	var wg sync.WaitGroup
	res := &result{
		value: math.MaxInt,
	}

	for i := 0; i < len(seedsInts); i += 2 {
		wg.Add(1)
		go func(j, k int) {
			defer wg.Done()
			runPair(res, j, k, mapLines)
		}(seedsInts[i], seedsInts[i+1])
	}
	wg.Wait()

	res.Lock()
	fmt.Println(res.value)
	res.Unlock()
}

func runPair(res *result, start, length int, maps [][][]int) {
	fmt.Println("goroutine running", start, length)
	r := math.MaxInt
	for i := start; i < start+length; i++ {
		seed := i
		for _, mapping := range maps {
			for _, rule := range mapping {
				if seed >= rule[1] && seed <= rule[1]+rule[2] {
					seed = rule[0] + (seed - rule[1])
					break
				}
			}
		}
		if r > seed {
			r = seed
		}
	}
	res.Lock()
	if res.value > r {
		res.value = r
	}
	res.Unlock()
}
