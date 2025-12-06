{-# LANGUAGE LambdaCase #-}
{-# OPTIONS_GHC -Wall #-}

{-# HLINT ignore "Use gets" #-}

import Control.Arrow
import Control.Monad.State
import Data.Ix (inRange)
import Debug.Trace

type Scanner = State [String]

runScanner s = evalState s . words

str :: Scanner String
str = get >>= \case s : ss -> put ss >> return s

int :: Scanner Int
int = read <$> str

range :: Scanner Range
range = (,) <$> int <*> int

peek :: Scanner String
peek = head <$> get

parseRanges :: Scanner [Range]
parseRanges = peek >>= (\case "-" -> str >> return []; _ -> (:) <$> range <*> parseRanges)

munch :: Scanner s -> Scanner [s]
munch s = get >>= \case [] -> return []; _ -> (:) <$> s <*> munch s

type Range = (Int, Int)

-- input must be pre-sorted
mergeRange :: [Range] -> [Range]
mergeRange ((a, b) : (c, d) : xs)
    | c <= b = mergeRange $ (a, d) : xs
    | otherwise = (a, b) : mergeRange ((c, d) : xs)
mergeRange x = x

solve :: [Range] -> [Int] -> Int
solve ranges = length . filter (flip any ranges . flip inRange)

parse :: Scanner ([Range], [Int])
parse = (,) <$> parseRanges <*> munch int

main =
    interact $
        runScanner parse >>> uncurry solve >>> show
