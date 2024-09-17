import luhn from "luhn";
/**
 * Check if a credit card number is valid using the Luhn algorithm
 */
export declare const validateLuhn: typeof luhn.validate;
/**
 * Given a credit card number in the format (XXXX XXXX XXXX...) return it as a string without any spaces
 */
export declare const sanitizeNumber: (number: string | number) => string;
/**
 * Return the issuer of a given credit card number or `unknown` if the issuer can't be identified
 */
export declare const getCardType: (cardNumber: string | number) => string;
/**
 * Configure the credit card types supported and return an array of valid types
 */
export declare const setInitialValidCardTypes: () => import("credit-card-type/dist/types").CreditCardTypeCardBrandId[];
/**
 * Provides a map of patterns to match for some card types
 */
export declare const cardTypesMap: {
    amex: string[];
    dinersclub: string[];
    visaelectron: string[];
};
