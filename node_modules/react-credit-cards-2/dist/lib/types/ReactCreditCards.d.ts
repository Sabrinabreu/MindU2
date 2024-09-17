export interface CallbackArgument {
    issuer: string;
    maxLength: number;
}
export type Focused = "name" | "number" | "expiry" | "cvc" | "";
export interface ReactCreditCardsProps {
    acceptedCards?: ReadonlyArray<string> | undefined;
    callback?: ((type: CallbackArgument, isValid: boolean) => void) | undefined;
    cvc: string | number;
    expiry: string | number;
    focused?: Focused | undefined;
    issuer?: string | undefined;
    locale?: {
        valid: string;
    } | undefined;
    name: string;
    number: string | number;
    placeholders?: {
        name: string;
    } | undefined;
    preview?: boolean | undefined;
}
export declare function ReactCreditCards(props: ReactCreditCardsProps): JSX.Element;
