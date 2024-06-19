import fs from 'fs'

export class Files {

    public static createDirectory(path: string): void {
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, {
                recursive: true,
            });
        }
    }

    public static modifyFileName(fileName: string): string {
        const extension = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        const rename = name.replace(/ /g, '_');
        return `${rename}_${Date.now()}.${extension}`;
    }

    public static getPublicPath(file: Express.Multer.File | undefined): string | null {
        if(file) {
            const result = file.path.split('uploads').pop() as string;
            return result;
        }
        return null;
    }

    public static removeSync(file: Express.Multer.File | undefined): void {
        if(file) {
            fs.unlinkSync(file.path);
        }
    }

    public static removeSyncByPath(path: string): void {
        if(fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    }
}