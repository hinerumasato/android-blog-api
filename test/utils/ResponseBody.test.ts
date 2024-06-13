import { ResponseBody } from "@/utils/ResponseBody";
import { Request } from "express"

describe('ResponseBody Test', () => {
    it("should return invalid fields", () => {
        const req = {
            body: {
                username: 'user',
                password: 'password',
            }
        } as Request;
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        expect(invalidFields).toEqual(['email', 'fullName']);
    })

    it("should return empty array", () => {
        const req = {
            body: {
                username: 'user',
                password: 'password',
                email: 'thangloitran406@gmail.com',
                fullName: 'Thang Loi Tran',
            }
        } as Request;
        const invalidFields = ResponseBody.getInvalidUserFields(req.body);
        expect(invalidFields).toEqual([]);
    })
})