{-# LANGUAGE RecordWildCards #-}
{-# OPTIONS_GHC -Wall -Wno-missing-signatures -Wno-incomplete-patterns -Wno-incomplete-uni-patterns -Wno-name-shadowing #-}

import Control.Arrow
import Control.Monad
import Control.Monad.ST
import Data.Array.ST
import Data.List (sort)
import Debug.Trace

data V3 s = V3 !s !s !s deriving (Eq, Ord, Show)
type V3I = V3 Int

readV3I :: String -> V3I
readV3I s = V3 x y z
  where
    [x, y, z] = map read $ words s

instance Foldable V3 where
    foldMap f (V3 x y z) = f x <> f y <> f z

V3 x1 y1 z1 ^-^ V3 x2 y2 z2 = V3 (x1 - x2) (y1 - y2) (z1 - z2)
V3 x1 y1 z1 ^.^ V3 x2 y2 z2 = (x1 * x2) + (y1 * y2) + (z1 * z2)

norm v = sqrt . abs . fromIntegral $ v ^.^ v

groupPairs xs = [(norm (a ^-^ b), ai, bi) | (a, ai) <- xs', (b, bi) <- xs', ai < bi]
  where
    xs' = zip xs [0 ..]

data UnionFind s = UnionFind
    { parent :: !(STUArray s Int Int)
    , sz :: !(STUArray s Int Int)
    }

create n = UnionFind <$> newListArray (0, n - 1) [0 .. n - 1] <*> newArray (0, n - 1) 1
find uf@(UnionFind{..}) x = do
    p <- readArray parent x
    if p /= x
        then do
            r <- find uf p
            writeArray parent x r
            pure r
        else
            pure x

union uf@(UnionFind{..}) x y = do
    x <- find uf x
    y <- find uf y
    when (x /= y) $ do
        sx <- readArray sz x
        sy <- readArray sz y

        writeArray parent y x
        writeArray sz x (sx + sy)
        writeArray sz y 0

solve :: [V3I] -> Int
solve xs = runST $ do
    uf <- create $ length xs

    let pairs = sort . groupPairs $ xs
    (a, b) <- go uf pairs

    let (V3 ax _ _) = xs !! a
        (V3 bx _ _) = xs !! b

    traceShowM (ax, bx)

    pure $ (fromIntegral ax) * (fromIntegral bx)
  where
    go :: UnionFind s -> [(Double, Int, Int)] -> ST s (Int, Int)
    go uf ((_, x, y) : xs) = do
        union uf x y

        done <- isDone <$> getElems (sz uf)

        if done
            then pure (x, y)
            else go uf xs

    isDone = (== 1) . length . filter (/= 0)

main =
    interact $
        lines >>> map readV3I >>> solve >>> show
