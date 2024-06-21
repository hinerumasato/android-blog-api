import { ResponseBody } from "@/utils";
import { Request } from "express";
import { IValidator } from "./IValidator";

export class UserValidator implements IValidator {
    private error: object;
    private req: Request;

    constructor(req: Request) {
        this.req = req;
        this.error = {};
    }

    validate = (): boolean => {
        const { username, password, email, fullName } = this.req.body;
        const invalidFields = ResponseBody.getInvalidUserFields({ username, password, email, fullName });
        if (invalidFields.length > 0) {
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