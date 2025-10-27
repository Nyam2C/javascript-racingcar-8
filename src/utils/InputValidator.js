import { ERRORS, GAME_RULES } from '../constants/index.js';

export const validateCarNameArray = (names) => {
    const trimmed = names.map((n) => String(n).trim());

    if (trimmed.some((n) => n === '')) {
        throw new Error(ERRORS.NAME_BLANK);
    }
    if (trimmed.some((n) => n.length > GAME_RULES.MAX_NAME_LEN)) {
        throw new Error(ERRORS.NAME_TOO_LONG);
    }

    if (new Set(trimmed).size !== trimmed.length) {
        throw new Error(ERRORS.NAMES_DUPLICATE);
    }
};

export const validateTryCount = (input) => {
    const n = Number(input);
    if (Number.isNaN(n)) {
        throw new Error(ERRORS.TRYCOUNT_NAN);
    }
    if (!Number.isInteger(n)) {
        throw new Error(ERRORS.TRYCOUNT_NOT_INT);
    }
    if (n < 0) {
        throw new Error(ERRORS.TRYCOUNT_NOT_POSITIVE);
    }
};