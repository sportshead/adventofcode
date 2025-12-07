{-# OPTIONS_GHC -Wall #-}

import Control.Arrow
import Data.List
import Data.Maybe (fromMaybe)

solve :: [String] -> Int
solve = sum . foldl' go (repeat 0)
  where
    go :: [Int] -> String -> [Int]
    go beams row = beams'
      where
        splitSpots = zipWith split beams row

        split :: Int -> Char -> Int
        split n '^' = n
        split _ _ = 0

        beams' = zipWith3 calculateBeam beams row [0 ..]
        calculateBeam :: Int -> Char -> Int -> Int
        calculateBeam _ 'S' _ = 1
        calculateBeam _ '^' _ = 0
        calculateBeam n _ idx = (+ n) . sum . map (fromMaybe 0) $ [splitSpots !? i | i <- [idx - 1, idx + 1]]

main =
    interact $
        lines >>> solve >>> show
