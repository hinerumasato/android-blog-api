export class Arrays {
    public static isEmpty = (array: null | Array<any>): boolean => {
        return array === null || array.length === 0;
    }

    public static isContainElementValid = (array: Array<any>): boolean => {
        return array.some(item => item !== null && item !== undefined);
    }
}