import { Post } from "@/models";
import { PostService } from "@/services/postService";
import { Request, Response } from "express";

class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
        this.getAllPosts = this.getAllPosts.bind(this);
        this.createPost = this.createPost.bind(this);
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
        console.log(req.body)
        const { title, content, userId, categoryId } = req.body;

        if(!title || !content || !userId || !categoryId) {
            const invalidFiels = [];
            if(!title) invalidFiels.push('title');
            if(!content) invalidFiels.push('content');
            if(!userId) invalidFiels.push('userId');
            if(!categoryId) invalidFiels.push('categoryId');
            return res.status(400).json({
                message: 'Invalid fields, these fields are required',
                fields: invalidFiels
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
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new PostController();