import Control.Arrow
import Data.List
import Debug.Trace

solve (cols, ops) = sum . zipWith go ops . map (map read . transpose) $ cols
  where
    go = foldl1' . getOp

    getOp '*' = (*)
    getOp '+' = (+)

main =
    interact $
        lines >>> splitter >>> fmap head >>> uncurry munch >>> solve >>> show
  where
    splitter xs = splitAt (length xs - 1) xs

munch :: [String] -> String -> ([[String]], [Char])
munch cols (op : ops) = case findIndex (/= ' ') ops of
    Just nextOp -> (c : cols'', op : ops')
      where
        c = map (take nextOp) cols
        cols' = map (drop $ nextOp + 1) cols
        (cols'', ops') = munch cols' $ drop nextOp ops
    Nothing -> ([cols], [op])
