import Control.Arrow
import Data.Char (digitToInt)
import Data.List
import Data.Maybe
import Debug.Trace

solve :: [Int] -> Int
solve = munch 0 12
  where
    munch :: Int -> Int -> [Int] -> Int
    munch acc 0 _ = acc
    munch acc _ [] = acc
    munch acc n xs
        | l == n = foldl' ((+) . (* 10)) acc xs
        | otherwise = munch (acc * 10 + max) (n - 1) (drop (maxI + 1) xs)
      where
        l = length xs

        candidates = take (l - n + 1) xs
        max = maximum candidates
        maxI = fromJust . elemIndex max $ candidates

main =
    interact $
        lines >>> map (solve . map digitToInt) >>> traceShowId >>> sum >>> show
