import Control.Arrow

solve = words >>> map parseCommand >>> scanl go 50 >>> filter (== 0) >>> length
  where
    go a b = (a + b) `mod` 100

parseCommand :: String -> Integer
parseCommand (x : xs)
    | x == 'L' = -num
    | x == 'R' = num
  where
    num = read xs

main = readFile "input.txt" >>= (print . solve)
