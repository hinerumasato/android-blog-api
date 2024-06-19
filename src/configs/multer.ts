import multer from "multer";
import { configDotenv } from "dotenv";
import { Files } from "@/utils/Files";
configDotenv();

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_AVATAR_PATH as string);
    },
    filename: (req, file, cb) => {
        cb(null, Files.modifyFileName(file.originalname));
    }
});

const thumbnailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_THUMBNAIL_PATH as string);
    },
    filename: (req, file, cb) => {
        cb(null, Files.modifyFileName(file.originalname));
    }

});

const avatarUpload = multer({ storage: avatarStorage }).single('avatar');
const thumbnailUpload = multer({ storage: thumbnailStorage }).single('thumbnail');
const noUpload = multer().none();

export { avatarUpload, thumbnailUpload, noUpload };
