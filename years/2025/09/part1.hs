import Control.Arrow
import Debug.Trace

data V2 = V2 !Int !Int deriving (Show)

readV2 :: String -> V2
readV2 s = V2 x y
  where
    [x, y] = map read . words $ s

area (V2 x1 y1) (V2 x2 y2) = abs (x1 - x2 + 1) * abs (y1 - y2 + 1)

solve :: [V2] -> Int
solve xs = maximum . map (uncurry area) $ [(xs !! a, xs !! b) | a <- [0 .. l], b <- [a + 1 .. l]]
  where
    l = length xs - 1

main =
    interact $
        lines >>> map readV2 >>> solve >>> show
