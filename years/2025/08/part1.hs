{-# LANGUAGE RecordWildCards #-}
{-# OPTIONS_GHC -Wall -Wno-missing-signatures -Wno-incomplete-patterns -Wno-incomplete-uni-patterns -Wno-name-shadowing #-}

import Control.Arrow
import Control.Monad
import Control.Monad.ST
import Data.Array.ST
import Data.List (sort, sortBy)
import Data.Ord (Down (Down), comparing)

data V3 s = V3 !s !s !s deriving (Eq, Ord, Show)
type V3D = V3 Double

readV3D :: String -> V3D
readV3D s = V3 x y z
  where
    [x, y, z] = map read $ words s

instance Foldable V3 where
    foldMap f (V3 x y z) = f x <> f y <> f z

V3 x1 y1 z1 ^-^ V3 x2 y2 z2 = V3 (x1 - x2) (y1 - y2) (z1 - z2)
V3 x1 y1 z1 ^.^ V3 x2 y2 z2 = (x1 * x2) + (y1 * y2) + (z1 * z2)

norm v = sqrt . abs $ v ^.^ v

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

solve :: [V3D] -> Int
solve xs = runST $ do
    uf <- create $ length xs

    let pairs = sort . groupPairs $ xs
    mapM_ (go uf) $ take 1000 pairs

    product . take 3 . sortBy (comparing Down) <$> getElems (sz uf)
  where
    go :: UnionFind s -> (Double, Int, Int) -> ST s ()
    go uf (_, x, y) = union uf x y

main =
    interact $
        lines >>> map readV3D >>> solve >>> show
