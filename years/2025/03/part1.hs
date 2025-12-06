import Control.Arrow
import Data.Char (digitToInt)
import Data.List
import Debug.Trace

solve :: [Int] -> Int
solve = maximum . map go . tails
  where
    go [] = 0
    go [_] = 0
    go (x : xs) = x * 10 + maximum xs

main =
    interact $
        lines >>> map (solve . map digitToInt) >>> sum >>> show
