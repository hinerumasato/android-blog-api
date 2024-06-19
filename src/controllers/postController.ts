import { Post } from "@/models";
import { PostService } from "@/services/postService";
import { Arrays } from "@/utils";
import { Files } from "@/utils/Files";
import { ResponseBody } from "@/utils/ResponseBody";
import { configDotenv } from "dotenv";
import { Request, Response } from "express";

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
        this.getAllPosts = this.getAllPosts.bind(this);
        this.createPost = this.createPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);

        configDotenv();
    }

    async getAllPosts(req: Request, res: Response) {
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

    async createPost(req: Request, res: Response) {
        const invalidFields = ResponseBody.getInvalidPostFields(req.body);
        const { title, content, userId, categoryId } = req.body;
        if(invalidFields.length > 0) {
            return res.status(400).json({
                message: 'Invalid fields, these fields are required',
                fields: invalidFields
            });
        }

        const file = req.file;
        const thumbnail = Files.getPublicPath(file);

        const post = Post.build({ title, content, userId, categoryId, thumbnail });
        const result = await this.postService.create(post);
        if(result) {
            res.status(201).json({
                statusCode: 201,
                message: 'Post created successfully',
                data: result
            });
        } else {
            res.status(500).json({ 
                statusCode: 500,
                message: 'Internal server error' 
            });
        }
    }

    async updatePost(req: Request, res: Response) {
        const { title, content, userId, categoryId } = req.body;
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
        const thumbnail = Files.getPublicPath(file);
        const post = Post.build({ title, content, userId, categoryId, thumbnail });
        try {
            const oldPost = await this.postService.findById(id);
            const entryDir = process.env.UPLOAD_ENTRY_DIR as string;
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

    async deletePost(req: Request, res: Response) {
        const id = parseInt(req.params.id);
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
    }
}

export default new PostController();