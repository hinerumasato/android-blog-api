import { Request } from "express";
import { IValidator } from "./IValidator";
import { Arrays, ResponseBody } from "@/utils";

export class CommentValidator implements IValidator {

    private req: Request;
    private error: object;
    constructor(req: Request) {
        this.req = req;
        this.error = {};
    }

    validate = (): boolean => {
        const { postId, userId, content } = this.req.body;
        const invalidFeilds = ResponseBody.getInvalidCommentFields({ postId, userId, content });
        if(!Arrays.isEmpty(invalidFeilds)) {
            this.error = {
                statusCode: 400,
                message: "Invalid comment fields",
                data: invalidFeilds
            }
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