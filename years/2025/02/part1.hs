{-# LANGUAGE LambdaCase #-}

import Control.Arrow
import Control.Monad.State

type Scanner = State [String]
runScanner s = evalState s . words

str :: Scanner String
str = get >>= \case s : ss -> put ss >> return s

int :: Scanner Integer
int = read <$> str

range :: Scanner (Integer, Integer)
range = (,) <$> int <*> int

many s = get >>= \case [] -> return []; _ -> (:) <$> s <*> many s

check n
    | odd $ length n = False
    | otherwise = uncurry (==) . splitAt (length n `div` 2) $ n

solve :: [(Integer, Integer)] -> [Integer]
solve xs = do
    (a, b) <- xs

    filter (check . show) [a .. b]

main =
    interact $
        runScanner (many range) >>> solve >>> sum >>> show
