import { UserValidator } from "@/validators/UserValidator";
import { Request } from "express";

describe('UserValidator', () => {
    it('shoud be return error when invalid fields', () => {
        const req = {
            body: {
                username: 'test',
                password: '123456',
            }
        } as unknown as Request

        const validator = new UserValidator(req);
        const validateResult = validator.validate();
        const error = validator.getError();
        expect(validateResult).toBe(false);
        expect(error).toEqual({
            statusCode: 400,
            message: 'Invalid fields',
            invalidFields: ['email', 'fullName']
        })
    });
});