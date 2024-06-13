import { Post } from "@/models";
import { PostService } from "@/services/postService";
import { ResponseBody } from "@/utils/ResponseBody";
import { Request, Response } from "express";

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
        this.getAllPosts = this.getAllPosts.bind(this);
        this.createPost = this.createPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    async getAllPosts(req: Request, res: Response) {
        const posts = await this.postService.findAll();
        res.json({
            statusCode: 200,
            message: 'Success',
            data: posts
        });
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

        const post = Post.build({ title, content, userId, categoryId });
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
        const post = Post.build({ title, content, userId, categoryId });
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

    }

    async deletePost(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const affectedCount = await this.postService.delete(id);
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