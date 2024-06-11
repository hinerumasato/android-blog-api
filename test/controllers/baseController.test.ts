import baseController from "@/controllers/baseController"
import { Request, Response } from "express"

describe('Test Base Controller', () => {
    it('should return 200', async () => {
        const req = {} as Request
        const res = {
            send: jest.fn(str => str)
        } as unknown as Response
        baseController.render(req, res)
        expect(res.send).toBeCalledWith("Hello World");
    })
})