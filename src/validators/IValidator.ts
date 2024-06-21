
export interface IValidator {
    validate: () => boolean;
    getError: () => object;
    doOnErrors: () => void;
}