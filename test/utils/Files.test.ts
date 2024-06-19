import { Files } from "@/utils/Files";

describe('Files Test', () => {
    it('should return modified file name', () => {
        const fileName = 'test image here.jpg';
        const result = Files.modifyFileName(fileName);
        expect(result).toContain('test_image_here_');
    });

    it('should return public path', () => {
        const file = {
            path: 'uploads/avatars/user.jpg'
        } as unknown as Express.Multer.File;

        const result = Files.getPublicPath(file);
        expect(result).toBe('/avatars/user.jpg');
    })
});