import { Request } from "express";
import { IValidator } from "./IValidator";
import { Arrays, ResponseBody } from "@/utils";

export class LovePostValidator implements IValidator {

    public static readonly LOVE = 1;
    public static readonly UNLOVE = 2;

    private req: Request;
    private mode: number;
    private errors: object;

    constructor(req: Request, mode: number) {
        this.req = req;
        this.mode = mode;
        this.errors = {};
    }

    private lovePostValidate = (postId: number, userId: number): boolean => {
        const invalidFields = ResponseBody.getInvalidLovePostFields({ postId, userId });
        if (Arrays.isEmpty(invalidFields)) {
            this.errors = {
                statusCode: 400,
                message: 'Invalid fields',
                invalidFields,
            };
            return false;
        }
        return true;
    }

    private unLoveValidate = (): boolean => {
        const { postId, userId } = this.req.query;
        return this.lovePostValidate(parseInt(postId as string), parseInt(userId as string));
    }

    private loveValidate = (): boolean => {
        const { postId, userId } = this.req.body;
        return this.lovePostValidate(postId, userId);
    }

    validate = (): boolean => {
        if (this.mode === LovePostValidator.UNLOVE) {
            return this.unLoveValidate();
        }
        return this.loveValidate();
    };

    getError = (): object => {
        return this.errors;
    };

    doOnErrors = (): void => {
        throw new Error("Method not implemented.");
    };
}