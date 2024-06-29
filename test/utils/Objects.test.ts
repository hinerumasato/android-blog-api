import { Objects } from "@/utils";

describe('Objects', () => {
    it('should filter valid fields', () => {
        const queries = Objects.filterValidFields({ postId: 1, userId: undefined });
        expect(queries).toEqual({ postId: 1 });
    });
});