import { Vector2 } from "./structs.ts";

// ESC means "Escape" (hex code 0x1b) .
// ST means either BEL (hex code 0x07) or ESC \\.
// Spaces in control sequences are to be ignored.
// Values in [brackets] are variable parameters, not literals.
// OSC means ESC ]
// CSI means ESC [
// SP means a literal "space" character (not ignored!)
const ESC = "\x1b";
const ST = "\x07";
const OSC = `${ESC}]`;
// OSC 1337 ; SetMark ST
export const ITERM_SET_MARK = `${OSC}1337;SetMark${ST}`;

export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DIGITS = "0123456789";

export const SYMBOLS = "!@#$%^&*()-+=[]{};:<>/?";

export const DIGITS_WORDS = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];

export enum DIRECTION {
    UP = "U",
    DOWN = "D",
    LEFT = "L",
    RIGHT = "R",
    UP_RIGHT = "UR",
    DOWN_RIGHT = "DR",
    UP_LEFT = "LR",
    DOWN_LEFT = "UL",
}

export enum CARDINAL {
    NORTH = "N",
    SOUTH = "S",
    EAST = "E",
    WEST = "W",
    NORTH_EAST = "NE",
    SOUTH_EAST = "SE",
    NORTH_WEST = "NW",
    SOUTH_WEST = "SW",
}

export const CARDINAL_DIRECTION: Record<CARDINAL, DIRECTION> = {
    [CARDINAL.NORTH]: DIRECTION.UP,
    [CARDINAL.SOUTH]: DIRECTION.DOWN,
    [CARDINAL.EAST]: DIRECTION.RIGHT,
    [CARDINAL.WEST]: DIRECTION.LEFT,
    [CARDINAL.NORTH_EAST]: DIRECTION.UP_RIGHT,
    [CARDINAL.SOUTH_EAST]: DIRECTION.DOWN_LEFT,
    [CARDINAL.NORTH_WEST]: DIRECTION.UP_LEFT,
    [CARDINAL.SOUTH_WEST]: DIRECTION.DOWN_LEFT,
};

export const DIRECTION_CARDINAL: Record<DIRECTION, CARDINAL> = {
    [DIRECTION.UP]: CARDINAL.NORTH,
    [DIRECTION.DOWN]: CARDINAL.SOUTH,
    [DIRECTION.RIGHT]: CARDINAL.EAST,
    [DIRECTION.LEFT]: CARDINAL.WEST,
    [DIRECTION.UP_RIGHT]: CARDINAL.NORTH_EAST,
    [DIRECTION.DOWN_RIGHT]: CARDINAL.SOUTH_EAST,
    [DIRECTION.UP_LEFT]: CARDINAL.NORTH_WEST,
    [DIRECTION.DOWN_LEFT]: CARDINAL.SOUTH_WEST,
};

export const CARDINAL_VECTOR2: Record<CARDINAL, Vector2> = {
    get [CARDINAL.NORTH]() {
        return new Vector2(0, 1);
    },
    get [CARDINAL.EAST]() {
        return new Vector2(1, 0);
    },
    get [CARDINAL.SOUTH]() {
        return new Vector2(0, -1);
    },
    get [CARDINAL.WEST]() {
        return new Vector2(-1, 0);
    },
    get [CARDINAL.NORTH_EAST]() {
        return new Vector2(1, 1);
    },
    get [CARDINAL.SOUTH_EAST]() {
        return new Vector2(1, -1);
    },
    get [CARDINAL.NORTH_WEST]() {
        return new Vector2(-1, 1);
    },
    get [CARDINAL.SOUTH_WEST]() {
        return new Vector2(-1, -1);
    },
};
