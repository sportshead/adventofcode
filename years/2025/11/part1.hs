import Control.Arrow
import Data.Map.Strict qualified as M

parseDevice line = (init from, out)
  where
    (from : out) = words line

solve :: M.Map String [String] -> [String]
solve m = go "you"
  where
    go :: String -> [String]
    go "out" = pure "out"
    go x = m M.! x >>= go

main =
    interact $
        lines >>> map parseDevice >>> M.fromList >>> solve >>> length >>> show
