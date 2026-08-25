import Control.Arrow
import Data.List
import Data.Map.Strict qualified as M
import Debug.Trace

parseDevice line = (init from, out)
  where
    (from : out) = words line

pathfind :: M.Map String [String] -> String -> String -> [[String]]
pathfind m from to = go $ pure from
  where
    go :: [String] -> [[String]]
    go xs@(x : _)
        | x == to = pure xs
        | Just ps <- m M.!? x = map (: xs) ps >>= go
        | otherwise = mempty

invertMap m = M.fromListWith (++) [(v, [k]) | (k, vs) <- M.toList m, v <- vs]

topoSort _ _ [] acc = acc
topoSort fwd rev (q : qs) acc = topoSort fwd rev' qs acc'
  where
    (parents, rev') = M.updateLookupWithKey (Just . delete q)

solve :: M.Map String [String] -> [[String]]
solve fwd = reversePathfind "dac" "out"
  where
    rev = invertMap fwd

    orphans = M.keys $ fwd `M.difference` rev

main =
    interact $
        lines >>> map parseDevice >>> solve >>> length >>> show
