import { Post } from "@/models";
import { PostService } from "@/services/postService";
import { Arrays } from "@/utils";
import { Files } from "@/utils/Files";
import { ResponseBody } from "@/utils/ResponseBody";
import { PostValidator } from "@/validators/PostValidator";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
        configDotenv();
    }

    getAllPosts = async (req: Request, res: Response) => {
        const posts = await this.postService.findAll();
        if(!Arrays.isEmpty(posts)) {
            res.json({
                statusCode: 200,
                message: 'Success',
                data: posts
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Not found'
            });
        }
    }

    getPostById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = await this.postService.findById(id);
        if(post) {
            res.json({
                statusCode: 200,
                message: 'Success',
                data: post
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                message: 'Post not found'
            });
        }
    }

    create = async (req: Request, res: Response) => {
        const { title, content, userId, categoryId } = req.body;
        const validator = new PostValidator(req);
        if(!validator.validate()) {
            return res.status(400).json(validator.getError());
        }
        
        const file = req.file;
        const thumbnail = Files.getPublicPath(file);
        const post = Post.build({ title, content, userId, categoryId, thumbnail });
        try {
            const result = await this.postService.create(post);
            res.json({
                statusCode: 201,
                message: 'Post created successfully',
                data: result
            });
        } catch (error) {
            res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error',
                error: error,
            });
        }
    }

    update = async (req: Request, res: Response) => {
        const { title, content, userId, categoryId, isUpload } = req.body;
        const id = parseInt(req.params.id);
        const invalidFields = ResponseBody.getInvalidPostFields(req.body);
        if(invalidFields.length > 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid fields, these fields are required',
                fields: invalidFields
            });
        }
        const file = req.file;
        const oldPost = await this.postService.findById(id);
        const thumbnail = (isUpload === 'true') ? Files.getPublicPath(file) : oldPost?.thumbnail;
        const post = Post.build({ title, content, userId, categoryId, thumbnail });
        try {
            const oldPost = await this.postService.findById(id);
            const entryDir = process.env.UPLOAD_ENTRY_DIR as string;
            if(isUpload === 'true' && oldPost?.thumbnail)
                Files.removeSyncByPath(`${entryDir}${oldPost?.thumbnail}`);
            const result = await this.postService.update(id, post);
            const [affectedCount] = result;
            if(affectedCount > 0) {
                res.json({
                    statusCode: 200,
                    message: 'Post updated successfully',
                    affectedCount: affectedCount
                });
            } 
            else {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Post not found' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error',
                error: error,
            });
        
        }

    }

    deletePost = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const affectedCount = await this.postService.delete(id);
            const post = await this.postService.findById(id);
            if(post) {
                const entryDir = process.env.UPLOAD_ENTRY_DIR as string;
                Files.removeSyncByPath(`${entryDir}${post.thumbnail}`);
            }
            if(affectedCount > 0) {
                res.json({
                    statusCode: 200,
                    message: 'Post deleted successfully',
                    affectedCount: affectedCount
                });
            } 
            else {
                res.status(404).json({
                    statusCode: 404,
                    message: 'Post not found' 
                });
            }
        } catch (error) {
            res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error',
                error: error,
            });
        }
    }
}

export default new PostController();