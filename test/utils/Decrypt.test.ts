import { Decrypt } from "@/utils/Decrypt";

describe('Decrypt Test', () => {
    it("should return hash", () => {
        const hash = Decrypt.sha256('password');
        expect(hash).toBeDefined();
    })
})