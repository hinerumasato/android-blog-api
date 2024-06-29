export class Objects {
    public static filterValidFields = (object: { [key: string]: any }): { [key: string]: any } => {
        const result: { [key: string]: any } = {};
        for (const key in object) {
            if (object[key] !== null && object[key] !== undefined && object[key] !== '' && !isNaN(object[key])) {
                result[key] = object[key];
            }
        }
        return result;
    };
}