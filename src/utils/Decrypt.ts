import crypto from "crypto";
import { configDotenv } from "dotenv";
export class Decrypt {
    static sha256(data: string): string {
        configDotenv();
        const secret = process.env.HASH_SECRET; 
        const hash = crypto.createHash('sha256');
        hash.update(data + secret);
        return hash.digest('hex');
    }
}