import Control.Arrow
import Data.Array qualified as A
import Data.Ix

type Grid = A.Array (Int, Int) Char

mkGrid :: [[Char]] -> Grid
mkGrid xs@(x : _) = A.listArray ((0, 0), (r - 1, c - 1)) $ concat xs
  where
    r = length xs
    c = length x

neigh :: Grid -> (Int, Int) -> [(Int, Int)]
neigh grid c@(a, b) =
    filter (inRange bounds) . filter (/= c) $
        [(x, y) | x <- [a - 1, a, a + 1], y <- [b - 1, b, b + 1]]
  where
    bounds = A.bounds grid

solve :: Grid -> Int
solve grid = length . filter (pred . fst) . filter ((== '@') . snd) . A.assocs $ grid
  where
    pred = (< 4) . length . filter (== '@') . map (grid A.!) . neigh grid

main =
    interact $
        lines >>> mkGrid >>> solve >>> show
