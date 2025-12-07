{-# OPTIONS_GHC -Wall #-}

import Control.Arrow
import Data.List

solve :: [String] -> Int
solve = snd . foldl' go (repeat False, 0)
  where
    go :: ([Bool], Int) -> String -> ([Bool], Int)
    go (beams, acc) row = (beams', acc + splits)
      where
        splitSpots = zipWith split beams row
        splits = length . filter id $ splitSpots

        split :: Bool -> Char -> Bool
        split True '^' = True
        split _ _ = False

        beams' = zipWith3 calculateBeam beams row [0 ..]
        calculateBeam :: Bool -> Char -> Int -> Bool
        calculateBeam _ 'S' _ = True
        calculateBeam _ '^' _ = False
        calculateBeam True '.' _ = True
        calculateBeam _ _ idx = elem (Just True) $ [splitSpots !? i | i <- [idx - 1, idx + 1]]

main =
    interact $
        lines >>> solve >>> show
