import { Request } from "express";
import { IValidator } from "./IValidator";
import { Arrays, ResponseBody } from "@/utils";

export class PostValidator implements IValidator {
    private error: object;
    private req: Request;

    constructor(req: Request) {
        this.req = req;
        this.error = {};
    }

    validate = (): boolean => {
        const { title, content, categoryId, userId } = this.req.body;
        const invalidFields = ResponseBody.getInvalidPostFields({ title, content, categoryId, userId });
        if (!Arrays.isEmpty(invalidFields)) {
            this.error = {
                statusCode: 400,
                message: 'Invalid fields', invalidFields,
            };
            return false;
        }
        return true;
    }

    getError = (): object => {
        return this.error;
    }
    doOnErrors = (): void => {
        throw new Error("Method not implemented.");
    }

}