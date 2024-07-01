import { Comment } from "@/models";
import { CommentService } from "@/services";
import { Objects } from "@/utils";
import { CommentValidator } from "@/validators/CommentValidator";
import { Request, Response } from "express";
import { SequelizeScopeError } from "sequelize";

class CommentController {
    private commentService: CommentService;
    constructor(commentService: CommentService) {
        this.commentService = commentService;
    }

    public findAll = async (req: Request, res: Response) => {
        const { userId, postId, replyTo } = req.query;
        const queries = Objects.filterValidFields({ userId, postId, replyTo });
        const comments = await this.commentService.findAllByCondition(queries);
        if(!comments || comments.length === 0) {
            return res.status(404).json({ 
                statusCode: 404,
                message: "Comments not found" 
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Comments retrieved successfully",
            data: comments
        });
    }

    public findById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comment = await this.commentService.findById(id);
        if(!comment) {
            return res.status(404).json({ 
                statusCode: 404,
                message: "Comment not found",
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: comment,
            message: "Comment retrieved successfully",
        });
    }

    public create = async (req: Request, res: Response) => {
        const { postId, userId, content, replyTo } = req.body;
        const validator = new CommentValidator(req);
        if(!validator.validate()) {
            return res.status(400).json(validator.getError());
        } else {
            const comment = Comment.build({ postId, userId, content, replyTo });
            try {
                const created = await this.commentService.create(comment);
                return res.status(201).json({
                    statusCode: 201,
                    message: "Comment created successfully",
                    data: created
                });
            } catch (error) {
                const sequelizeError = error as SequelizeScopeError;
                return res.status(500).json({
                    statusCode: 500,
                    message: "Internal server error",
                    error: sequelizeError
                });
            }
        }   
    }

    public update = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { userId, postId, content, replyTo } = req.body;
        const validator = new CommentValidator(req);
        if(!validator.validate()) {
            return res.status(400).json(validator.getError());
        } else {
            const comment = Comment.build({ postId, userId, content, replyTo });
            try {
                const [affectedCount] = await this.commentService.update(id, comment);
                if(affectedCount === 0) {
                    return res.status(404).json({
                        statusCode: 404,
                        message: "Comment not found",
                    });
                }
                return res.status(200).json({
                    statusCode: 200,
                    message: "Comment updated successfully",
                    affectedCount: affectedCount,
                });
            } catch (error) {
                const sequelizeError = error as SequelizeScopeError;
                return res.status(500).json({
                    statusCode: 500,
                    message: "Internal server error",
                    error: sequelizeError.message
                });
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        try {
            const affectedCount = await this.commentService.delete(id);
            if(affectedCount === 0) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Comment not found",
                });
            }
            return res.status(200).json({
                statusCode: 200,
                message: "Comment deleted successfully",
                affectedCount: affectedCount,
            });
        } catch (error) {
            const sequelizeError = error as SequelizeScopeError;
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
                error: sequelizeError.message
            });
        }
    }
}

export default new CommentController(new CommentService());