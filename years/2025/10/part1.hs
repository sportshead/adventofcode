{-# OPTIONS_GHC -Wall -Wno-missing-signatures -Wno-incomplete-patterns -Wno-incomplete-uni-patterns -Wno-name-shadowing #-}

import Control.Arrow
import Data.Bits
import Data.List
import Data.Ord
import Data.Word

solve (lights : xs) =
    length
        . head
        . filter ((== light) . foldl' xor 0)
        . sortBy (comparing length)
        $ subsequences buttons
  where
    light = parseLight lights
    buttons = map parseButton $ init xs

parseLight :: [Char] -> Word16
parseLight = foldl1' (.|.) . zipWith go [0 ..] . init . drop 1
  where
    go i '#' = bit i
    go _ _ = 0

parseButton :: [Char] -> Word16
parseButton = foldl1' (.|.) . map (bit . read) . csv . init . drop 1

csv s = case dropWhile (== ',') s of
    "" -> []
    s' -> w : csv s''
      where
        (w, s'') =
            break (== ',') s'

main =
    interact $
        lines >>> map (solve . words) >>> sum >>> show
