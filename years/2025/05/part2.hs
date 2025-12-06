{-# LANGUAGE LambdaCase #-}
{-# OPTIONS_GHC -Wall #-}

{-# HLINT ignore "Use gets" #-}

import Control.Arrow
import Control.Monad.State
import Data.List
import Debug.Trace

type Scanner = State [String]

runScanner s = evalState s . words

str :: Scanner String
str = get >>= \case s : ss -> put ss >> return s

int = read <$> str

range :: Scanner Range
range = (,) <$> int <*> int

peek :: Scanner String
peek = head <$> get

parseRanges :: Scanner [Range]
parseRanges = peek >>= (\case "-" -> str >> return []; _ -> (:) <$> range <*> parseRanges)

type Range = (Integer, Integer)

-- input must be pre-sorted
mergeRange :: [Range] -> [Range]
mergeRange ((a, b) : (c, d) : xs)
    | c <= b = mergeRange $ (a, max b d) : xs
    | otherwise = (a, b) : mergeRange ((c, d) : xs)
mergeRange x = x

main =
    interact $
        runScanner parseRanges >>> sort >>> mergeRange >>> traceShowId >>> map (\(a, b) -> b - a + 1) >>> sum >>> show
