{-# LANGUAGE LambdaCase #-}

import Control.Arrow
import Control.Monad.State
import Data.List

type Scanner = State [String]
runScanner s = evalState s . words

str :: Scanner String
str = get >>= \case s : ss -> put ss >> return s

int :: Scanner Integer
int = read <$> str

range :: Scanner (Integer, Integer)
range = (,) <$> int <*> int

many s = get >>= \case [] -> return []; _ -> (:) <$> s <*> many s

check :: String -> Bool
check xs =
    any (\(x : xs) -> all (== x) xs) $
        [chunk xs n | n <- [1 .. halfLen], len `mod` n == 0]
  where
    len = length xs
    halfLen = len `div` 2

    chunk [] _ = []
    chunk xs n = x : chunk xs' n
      where
        (x, xs') = splitAt n xs

solve :: [(Integer, Integer)] -> [Integer]
solve xs = do
    (a, b) <- xs

    filter (check . show) [a .. b]

main =
    interact $
        runScanner (many range) >>> solve >>> sum >>> show
