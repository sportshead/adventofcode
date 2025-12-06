import Control.Arrow
import Data.List
import Debug.Trace

solve (cols, [ops]) = sum . zipWith go ops . map (map read) $ transpose cols
  where
    go = foldl1' . getOp

    getOp "*" = (*)
    getOp "+" = (+)

main =
    interact $
        lines >>> map words >>> splitter >>> solve >>> show
  where
    splitter xs = splitAt (length xs - 1) xs
