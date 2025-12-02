import Control.Arrow

solve = words >>> map parseCommand >>> concatMap explode >>> scanl go 50 >>> filter (== 0) >>> length
  where
    explode n = replicate (abs n) (signum n)

    go a b = (a + b) `mod` 100

parseCommand :: String -> Int
parseCommand (x : xs)
    | x == 'L' = -num
    | x == 'R' = num
  where
    num = read xs

main = readFile "input.txt" >>= (print . solve)
