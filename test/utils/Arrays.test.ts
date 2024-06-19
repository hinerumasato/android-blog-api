import { Arrays } from "@/utils";

describe('Arrays Test', () => {
    it('should return true if array is empty', () => {
        const result = Arrays.isEmpty([]);
        expect(result).toBe(true);
    });

    it('should return array that contain element valid', () => {
        const result = Arrays.isContainElementValid([null, 'test', undefined]);
        expect(result).toBe(true);
    });
});