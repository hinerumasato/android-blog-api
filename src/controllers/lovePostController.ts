import { LovePost } from "@/models";
import { LovePostService } from "@/services";
import { Arrays, Objects } from "@/utils";
import { LovePostValidator } from "@/validators/lovePostValidator";
import { Request, Response } from "express";

class LovePostController {
    private lovePostService: LovePostService;
    constructor(lovePostService: LovePostService) {
        this.lovePostService = lovePostService;
    }

    public findAll = async (req: Request, res: Response) => {
        const postId = parseInt(req.query.postId as string);
        const userId = parseInt(req.query.userId as string);
        
        const queries = Objects.filterValidFields({ postId, userId });
        const lovePosts = await this.lovePostService.findAllByCondition(queries);
        if(!Arrays.isEmpty(lovePosts)) {
            return res.json({
                statusCode: 200,
                message: 'Success',
                data: lovePosts
            });
        }

        return res.json({
            statusCode: 404,
            message: 'Not found'
        });
    }

    public love = async (req: Request, res: Response) => {
        const validator = new LovePostValidator(req, LovePostValidator.LOVE);
        if(!validator.validate()) {
            return res.status(400).json(validator.getError());
        }
        const { postId, userId } = req.body;
        const lovePost = LovePost.build({ postId, userId });
        try {
            const created = await this.lovePostService.create(lovePost);
            return res.json({
                statusCode: 200,
                message: 'Success',
                data: created
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Error occurred while loving post',
                statusCode: 400,
                error: error,
            });
        }
    }

    public unlove = async (req: Request, res: Response) => {
        const validator = new LovePostValidator(req, LovePostValidator.UNLOVE);
        if(!validator.validate()) {
            return res.status(400).json(validator.getError());
        }
        try {
            const { postId, userId } = req.query;
            const uId = parseInt(userId as string);
            const pId = parseInt(postId as string);
            const deleted = await this.lovePostService.deleteByUserIdAndPostId(uId, pId);
            if(deleted > 0) {
                return res.json({
                    statusCode: 200,
                    message: 'Unlove Successfully',
                    affectedCount: deleted
                });
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'Post not found'
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: 'Error occurred while unloving post',
                statusCode: 400,
                error: error,
            });
        }
    }
}

export default new LovePostController(new LovePostService());