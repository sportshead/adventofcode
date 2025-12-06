import Control.Arrow
import Control.Monad
import Control.Monad.ST (ST, runST)
import Data.Array qualified as A
import Data.Array.ST qualified as S
import Data.Ix
import Data.Maybe
import Data.STRef

type Grid = A.Array (Int, Int) Char

mkGrid :: [[Char]] -> A.Array (Int, Int) Char
mkGrid xs@(x : _) = A.listArray ((0, 0), (r - 1, c - 1)) $ concat xs
  where
    r = length xs
    c = length x

neigh :: ((Int, Int), (Int, Int)) -> (Int, Int) -> [(Int, Int)]
neigh bounds c@(a, b) =
    filter (inRange bounds) . filter (/= c) $
        [(x, y) | x <- [a - 1, a, a + 1], y <- [b - 1, b, b + 1]]

solve :: Grid -> Int
solve grid = runST $ do
    grid' <- S.thaw grid
    count <- newSTRef 0

    go grid' count

    readSTRef count
  where
    go :: forall s. S.STUArray s (Int, Int) Char -> STRef s Int -> ST s ()
    go grid count = do
        roll <- getValid grid =<< S.getAssocs grid

        case roll of
            Just (i, _) -> do
                modifySTRef count (+ 1)
                S.writeArray grid i '.'

                go grid count
            Nothing -> mempty

    getValid grid = fmap listToMaybe . filterM (pred grid . fst) . filter ((== '@') . snd)

    bounds = A.bounds grid
    pred grid = fmap ((< 4) . length . filter (== '@')) . mapM (S.readArray grid) . neigh bounds

main =
    interact $
        lines >>> mkGrid >>> solve >>> show
